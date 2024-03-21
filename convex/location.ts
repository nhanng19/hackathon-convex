import { action } from "./_generated/server";
import { v } from "convex/values";

interface LocationParams {
    latitude: number;
    longitude: number;
}

const getCity = async ({
    latitude,
    longitude
}: LocationParams) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
        const response = await fetch(url, {
            method: "GET",
        
          });
          const data = await response.json();
          const compound_code = data.plus_code.compound_code.split(' ');
          compound_code.shift();
          const city = compound_code.join(' ');
          return city;
    } catch (error: any) {
        return error;
      }
    
}

export const fetchCity = action({
    args: {latitude: v.number() , longitude: v.number() },
    handler: async (ctx, args) => {
        const data = await getCity(args);
        return data;
    }
})