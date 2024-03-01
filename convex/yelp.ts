import { action } from "./_generated/server";
import { v } from "convex/values";

interface YelpParams {
  latitude: number;
  longitude: number;
  cuisines: string;
}

const getRestaurants = async ({
  latitude,
  longitude,
  cuisines,
}: YelpParams) => {
  try {
    console.log(cuisines);
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${cuisines}&limit=50`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          `${process.env.YELP_APY_KEY}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const fetchRestaurants = action({
  args: { latitude: v.number(), longitude: v.number(), cuisines: v.string() },
  handler: async (ctx, args) => {
    const data = await getRestaurants(args);
    return data;
  },
});
