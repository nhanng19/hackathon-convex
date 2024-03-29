"use client";

import Card from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import MapComponent from "@/components/map/MapComponent";
import { YelpBusiness } from "@/types";
import { Skeleton } from "@mui/material";

export default function LinkUp() {
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  const fetchRestaurants = useAction(api.yelp.fetchRestaurants);
  const addRestaurant = useMutation(api.user.addRestaurant);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [fetch, shouldFetch] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState();
  const handleAddRestaurant = (restaurant: YelpBusiness) => {
    addRestaurant({
      id: userId as Id<"user">,
      restaurant,
    });
  };

  useEffect(() => {
    const handleFetchRestaurants = async () => {
      if (!fetch && user) {
        const cuisines: string = user.cuisines.join(",");
        const data = await fetchRestaurants({
          latitude: user.lat,
          longitude: user.long,
          cuisines: cuisines,
        });
        const restaurantsData = data?.businesses;
        setRestaurants(restaurantsData);
        setCurrentPosition(restaurantsData[restaurantsData.length - 1]);
        shouldFetch(true);
      }
    };

    handleFetchRestaurants();
  }, [user]);

  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);

  const activeIndex = restaurants?.length - 1;

  const removeCard = (id: string, action: "right" | "left") => {
    setRestaurants((prev) => prev.filter((card) => card.id !== id));
    if (action === "right") {
      setRightSwipe((prev) => prev + 1);
    } else {
      setLeftSwipe((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCurrentPosition(restaurants[restaurants.length - 1]);
  }, [restaurants]);

  return (
    <section className="main-container p-0">
      <div className="w-full h-full">
        <div className="flex-col md:flex-row relative flex h-full w-full items-center justify-center overflow-hidden text-textGrey">
          <div className="flex-none md:flex-1 flex justify-center items-center shadow-2xl z-20 w-full h-full">
            <AnimatePresence>
              {restaurants?.length ? (
                restaurants.map((card, indx) => (
                  <Card
                    key={card.alias}
                    data={card}
                    active={indx === activeIndex}
                    removeCard={removeCard}
                    handleAddRestaurant={handleAddRestaurant}
                  />
                ))
              ) : (
                <div className="flex flex-col gap-4 min-w-40">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "100%" }}
                  />
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" className="w-full" />
                  <Skeleton variant="rounded" width={210} height={60} />
                </div>
              )}
            </AnimatePresence>
          </div>
          <MapComponent
            defaultZoom={12}
            defaultCenter={{ lat: user?.lat, lng: user?.long }}
            currentPosition={currentPosition}
          />
        </div>
      </div>
    </section>
  );
}
