import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
      const posts = await ctx.db.query("post").order("asc").take(100);
      console.log(posts)
    return posts.reverse();
  },
});

export const sendPost = mutation({
  args: { body: v.string(),  userId: v.any(), },
  handler: async (ctx, { body, userId  }) => {
    await ctx.db.insert("post", { body, userId });
  },
});