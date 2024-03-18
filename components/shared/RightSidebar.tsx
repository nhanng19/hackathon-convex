"use client";

import useRestaurants from "@/hooks/useRestaurant";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";

const RightSidebar = () => {
  const restaurants = useRestaurants();
  const users = useQuery(api.user.getAllUsers);
  return (
    <section className="customer-scrollbar rightsidebar max-w-sm">
      <div className="flex gap-4 flex-col flex-1 justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Places you may like
        </h3>
        <ul className="flex flex-col gap-4 h-full justify-center">
          {restaurants?.slice(0, 5).map((restaurant) => (
            <li key={restaurant.alias}>
              <a
                target="_blank"
                href={restaurant.url}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 rounded-md"
              >
                <Image
                  className="w-10 h-10 rounded-full object-cover min-w-10 min-h-10"
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  width={40}
                  height={40}
                />
                <div className="font-medium text-white">
                  <div className="truncate ... overflow-hidden">
                    {restaurant.name}
                  </div>
                  <div className=" text-gray-400 text-small-medium">
                    {restaurant?.location?.display_address[0]}{" "}
                    {restaurant?.location?.display_address[1]}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1 justify-center gap-4">
        <h3 className="text-heading4-medium text-light-1">
          Foodies you may know
        </h3>
        <ul className="flex flex-col gap-4 h-full justify-center">
          {users?.slice(0, 5).map((user) => (
            <li key={user.alias}>
              <Link
                href={`/profile/${user._id}`}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 rounded-md"
              >
                <Image
                  className="w-10 h-10 rounded-full object-cover min-w-10 min-h-10"
                  src={user.imageUrl}
                  alt={user.name}
                  width={40}
                  height={40}
                />
                <div className="font-medium text-white">
                  <div className="truncate ... overflow-hidden">
                    {user.name}
                  </div>
                  <div className=" text-gray-400  text-small-medium">
                    Likes{" "}
                    {user.cuisines.map((cuisine : any, indx: number) => (
                      <span key={indx}>
                        {indx < user.cuisines.length - 1
                          ? `${cuisine}, `
                          : `and ${cuisine} cuisines`}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RightSidebar;
