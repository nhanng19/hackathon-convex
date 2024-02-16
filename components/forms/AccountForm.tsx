"use client";
import Image from "next/image";
import RangeSlider from "./RangeSlider";
import { currentUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
}
interface FormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  bio: string;
  cuisines: string[];
  maxRadius: number
}

export default  function AccountForm({ user }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      emailAddress: user?.emailAddress || "",
      bio: "",
      cuisines: [],
      maxRadius: 0
    },
  });


  const onSubmit = async (values: z.infer<typeof UserValidation>) => { 
    console.log(values)
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="bg-white py-8 px-6 rounded-lg sm:px-10">
        <div className="sm:mx-auto sm:w-full flex flex-col items-start">
          <Image
            className="mx-auto h-12 w-auto"
            src="/../favicon.ico"
            width={500}
            height={500}
            alt="Fooder"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 self-start">
            Welcome to Fooder!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Complete your onboarding to continue.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 space-y-6"
          action="#"
          method="POST"
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                First Name
              </label>
              <div className="mt-1">
                <input
                  {...register("firstName")}
                  id="First_name"
                  name="First_name"
                  type="First_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  {...register("lastName")}
                  id="Last Name"
                  name="Last Name"
                  type="Last Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("emailAddress")}
                  id="email"
                  name="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <div className="mt-1">
              <textarea
                required
                id="bio"
                rows={3}
                name="bio"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Choose Cuisines:
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="chinese"
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Chinese
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="american"
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                American
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="vietnamese"
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Vietnamese
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="italian"
                className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Italian
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="mexican"
                className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Mexican
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="checkbox"
                type="checkbox"
                value="indian"
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Indian
              </label>
            </div>
          </ul>

          {/* <div className="slidecontainer">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distance radius: </label>
            <div id='rangeValue'>0</div>
            <input id="default-range" type="range" min={0} max={100} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
          </div> */}
          <RangeSlider
            initialMin={2500}
            initialMax={7500}
            min={0}
            max={10000}
            step={100}
            priceCap={1000}
          />

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
