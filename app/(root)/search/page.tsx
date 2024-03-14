"use client";

import { query } from "@/convex/_generated/server";
import { useState, FormEvent, useEffect } from "react";
import { searchUsers } from "../../../convex/user";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";

const Search = () => {
  const usersData = useQuery(api.user.getAllUsers);
  console.log(usersData);
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      if (usersData) {
        setUsers(usersData);
      }
    };

    getUsers();
  }, [usersData]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        {" "}
        <form className="max-w-md mx-auto">
          <label
            htmlFor="searchBar"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="searchBar"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Friends..."
              required
              value={filter}
              onChange={handleFilterChange}
            />
            <button
              type="button"
              className="text-grey-400 absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            <section>
              {users.length > 0 && (
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  {users
                    ?.filter((user) =>
                      user.name.toLowerCase().includes(filter.toLowerCase())
                    )
                    ?.map((user) => (
                      <Link
                        // href={`/profile/${user._id}`}
                        href={`/profile`}
                        className="h-full flex justify-start items-center border border-radius p-2 m-2 w-full rounded-lg pl-8 gap-4"
                        key={user._id}
                      >
                        <Image
                          className="w-10 h-10 rounded-full object-cover min-w-10 min-h-10"
                          src={user.imageUrl}
                          alt="profile pic"
                          width={40}
                          height={40}
                        />
                        <h5 className="font-medium dark:text-white">
                          {user.name}
                        </h5>
                      </Link>
                    ))}
                </div>
              )}
            </section>
          </ul>
        </form>
      </div>
    </section>
  );
};

export default Search;
