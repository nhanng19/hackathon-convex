import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { useUser } from "@clerk/clerk-react";
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
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const getSingleUser = query({
  args: { userId: v.any() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("user").filter((q) => q.eq(q.field("_id"), args.userId)).unique();
    return user;
  },
});
