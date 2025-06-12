import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const getUrl = mutation({
  args: {
    storageId: v.id("storage"),
  },
  handler: async (ctx, agrs) =>{
    return await ctx.storage.getUrl(agrs.storageId)
  }
})