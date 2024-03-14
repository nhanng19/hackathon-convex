import {
  internalMutation,
  query,
  internalAction,
  internalQuery,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";

export const getAllMatches = internalQuery({
  args: {},
  async handler(ctx, args) {
    const matches = await ctx.db.query("matches").collect();
    return matches;
  },
});

export const insertSingleMatch = internalMutation({
  args: { match: v.any() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("matches", args.match);
  },
});

export const determineMatches = internalMutation({
  args: {},
  async handler(ctx, args) {
    const users = await ctx.db.query("user").collect();
    const pairs = findMatchingPairs(users);
    return pairs;
  },
});

export const pushMatches = internalAction({
  args: {},
  async handler(ctx, args) {
    const matchesData = await ctx.runMutation(
      internal.matches.determineMatches
    );
    const matches = await ctx.runQuery(internal.matches.getAllMatches);
    for (const matchData of matchesData) {
      const existingMatch = matches.find(
        (match) => match.compositeKey === matchData.compositeKey
      );

      if (!existingMatch) {
        await ctx.runMutation(internal.matches.insertSingleMatch, {
          match: matchData,
        });
      }
    }
  },
});

export const getUserMatches = query({
  args: { userId: v.any() },
  handler: async (ctx, args) => {
    const { userId } = args;
    const data = await ctx.db
      .query("matches")
      .collect();
    const matches = data.filter((match) => match.compositeKey.includes(userId))
    return matches;
  },
});

function findMatchingPairs(users: any) {
  const matchingPairs = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const commonRestaurants = findCommonRestaurants(
        users[i].likedRestaurants,
        users[j].likedRestaurants
      );
      if (commonRestaurants.length >= 3) {
        const user1Id = users[i]._id;
        const user2Id = users[j]._id;
        matchingPairs.push({
          compositeKey: `${user1Id}-${user2Id}`,
          pair: [
            {
              id: user1Id,
              name: users[i].name,
              photo: users[i].imageUrl,
            },
            {
              id: user2Id,
              name: users[j].name,
              photo: users[j].imageUrl,
            },
          ],
          commonRestaurants: commonRestaurants,
        });
      }
    }
  }
  return matchingPairs;
}

function findCommonRestaurants(restaurants1: any, restaurants2: any) {
  return restaurants1.filter((restaurant1: any) => {
    return restaurants2.some((restaurant2: any) => {
      return restaurant1.alias === restaurant2.alias;
    });
  });
}
