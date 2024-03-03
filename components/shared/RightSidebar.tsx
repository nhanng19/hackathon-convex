"use client";

import useRestaurants from "@/hooks/useRestaurant";

const RightSidebar = () => {
  const restaurants = useRestaurants();
  console.log(restaurants);
  return (
    <section className="customer-scrollbar rightsidebar max-w-sm">
      <div className="flex gap-4 flex-col flex-1 justify-start">
        <h3 className="text-heading4-medium text-dark-1">
          Places you might like
        </h3>
        <ul className="flex flex-col gap-4">
          {restaurants?.slice(0, 5).map((restaurant) => (
            <li key={restaurant.alias}>
                  <a target="_blank" href={restaurant.url} className="flex items-center gap-4 cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full object-cover min-w-10 min-h-10"
                  src={restaurant.image_url}
                  alt={restaurant.name}
                />
                <div className="font-medium dark:text-white">
                  <div className="truncate ... overflow-hidden">
                    {restaurant.name}
                  </div>
                  <div className=" text-gray-500 dark:text-gray-400 text-small-medium">
                    {restaurant?.location?.display_address[0]}{" "}
                    {restaurant?.location?.display_address[1]}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1 justify-start">
        <h3 className="text-heading4-medium text-dark-1">
          Foodies you might know
        </h3>
      </div>
    </section>
  );
};

export default RightSidebar;
