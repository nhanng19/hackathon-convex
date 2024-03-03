"use client"

import { api } from "@/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useEffect, useState } from "react";
const useRestaurants = () => {
    const userId = useStoreUserEffect();
    const user = useQuery(api.user.getSingleUser, {
        userId: userId,
    });
    const fetchRestaurants = useAction(api.yelp.fetchRestaurants);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [fetch, shouldFetch] = useState<boolean>(false);

    useEffect(() => {
        const handleFetchRestaurants = async () => {
            if (!fetch && user) {
                const cuisines: string = user.cuisines.join(",");
                const data = await fetchRestaurants({
                    latitude: user.lat,
                    longitude: user.long,
                    cuisines: cuisines,
                });
                setRestaurants(data?.businesses);
                shouldFetch(true);
            }
        };

        handleFetchRestaurants();
    }, [user]);
    
    return restaurants
}

export default useRestaurants;