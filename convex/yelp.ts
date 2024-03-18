import { action } from "./_generated/server";
import { v } from "convex/values";

interface YelpParams {
  latitude: number;
  longitude: number;
  cuisines: string;
}


const header =  {
        Authorization:
          "Bearer " +
          `${process.env.YELP_API_KEY}`,
        "Access-Control-Allow-Origin": "*",
}

const getRestaurants = async ({
  latitude,
  longitude,
  cuisines,
}: YelpParams) => {
  try {
    const url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${cuisines}&limit=50`;
    const response = await fetch(url, {
      method: "GET",
      headers: header
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

const getReviews = async (alias : string) => { 
  try { 
    const url = `https://api.yelp.com/v3/businesses/${alias}/reviews?limit=20&sort_by=yelp_sort`;
    const response = await fetch(url, {
      method: "GET",
      headers: header
      }
    )
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error)
  }
}

export const fetchReviews = action({
  args: { alias: v.string() },
  handler: async (ctx, args) => { 
    const data = await getReviews(args.alias);
    return data;
  }
})

export const fetchRestaurants = action({
  args: { latitude: v.number(), longitude: v.number(), cuisines: v.string() },
  handler: async (ctx, args) => {
    const data = await getRestaurants(args);
    return data;
  },
});
