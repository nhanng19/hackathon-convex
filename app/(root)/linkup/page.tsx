"use client";

import Card from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function LinkUp() {
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  const fetchRestaurants = useAction(api.yelp.fetchRestaurants);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  
  useEffect(() => {
    const handleFetchRestaurants = async () => {
      if (user) {
        const cuisines: string = user.cuisines.join(",")
        const data = await fetchRestaurants({
          latitude: user.lat,
          longitude: user.long,
          cuisines: cuisines,
        });
        console.log(data);
        setRestaurants(data?.businesses);
      }
    };
    handleFetchRestaurants();
  }, [user]);

  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);

  const activeIndex = restaurants?.length - 1;
  const removeCard = (id: number, action: "right" | "left") => {
    setRestaurants((prev) => prev.filter((card) => card.id !== id));
    if (action === "right") {
      setRightSwipe((prev) => prev + 1);
    } else {
      setLeftSwipe((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white text-textGrey">
      <AnimatePresence>
        {restaurants?.length ? (
          restaurants.map((card, indx) => (
            <Card
              key={card.alias}
              data={card}
              active={indx === activeIndex}
              removeCard={removeCard}
            />
          ))
        ) : (
          <h2 className="absolute z-10 self-center text-center text-2xl font-bold text-textGrey ">
            Excessive swiping can be injurious to health!
            <br />
            Come back tomorrow for more
          </h2>
        )}
      </AnimatePresence>
    </div>
  );
}
