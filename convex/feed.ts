import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createFeed = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("feed", {
      text: args?.text
    });
  },
});
