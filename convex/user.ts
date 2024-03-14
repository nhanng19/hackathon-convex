import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    const user = await ctx.db
      .query("user")
      .filter((q) =>
        q.eq(q.field("tokenIdentifier"), identity?.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      return user._id;
    }
  },
});

export const store = mutation({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Called storeUser without authentication present");
    }
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("user", {
      name: identity.name!,
      onboarded: false,
      likedRestaurant: [],
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const getSingleUser = query({
  args: { userId: v.any() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();
    return user;
  },
});

export const updateUserProfile = mutation({
  args: { id: v.id("user"), userData: v.any() },
  handler: async (ctx, args) => {
    const { id, userData } = args;
    await ctx.db.patch(id, { ...userData });
  },
});

export const addRestaurant = mutation({
  args: { id: v.id("user"), restaurantId: v.string() },
  handler: async (ctx, args) => {
    const { id, restaurantId } = args;
    const user = await ctx.db.get(id);
    const restaurantArray = user?.likedRestaurants || [];
    restaurantArray.push(restaurantId);
    await ctx.db.patch(id, { likedRestaurants: restaurantArray });
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("user").collect();
    return users;
  },
});

export const searchUsers = query({
  args:{ username: v.string() },
  handler: async (ctx, { username }) => {
    try {
      const users = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("name"), username))
        .collect();
      
      if (users) {
        console.log('User found:', users);
        return users;
      } else {
        console.log('User not found');
        return null;
      }
    } catch (error) {
      // Handle any errors
      console.error("Error searching for user:", error);
      throw error;
    }
  }
}) 

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, { body, author }) => {
    // Send a new message.
    await ctx.db.insert("messages", { body, author });
  },
});
