"use client";

import Image from "next/image";
import RangeSlider from "./RangeSlider";
import { currentUser } from "@clerk/nextjs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as z from "zod";
import { mapToStringArray } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SliderComponent } from "@/components/ui/slider";
import { cuisineOptions } from "@/constants";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import useLocation from "@/hooks/useLocation";
interface Props {
  user: {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };
}

interface FormData {
  name: string;
  cuisines: string[];
  maxRadius: number;
}

const miles: number[] = [];

for (let i = 0; i <= 50; i += 10) {
  miles.push(i);
}

export default function AccountForm({ user }: Props) {
  const updateUserProfile = useMutation(api.user.updateUserProfile);
  const userId = useQuery(api.user.getCurrentUser);
  const router = useRouter();
  const location = useLocation();
  
  const form = useForm<FormData>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: `${user.firstName} ${user.lastName}` || "",
      cuisines: [],
      maxRadius: 50,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    updateUserProfile({
      id: userId as Id<"user">,
      userData: { ...values, lat: location?.latitude, long: location?.longitude, onboarded: true },
    });
    router.push("/dashboard");
  };

  return (
    <div className="mt-8 sm:w-full ">
      <div className="bg-white py-8 px-6 rounded-lg ">
        <div className=" flex flex-col items-start mb-8">
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
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-0 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className="text-base-semibold text-dark-2">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="cuisines"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-base-semibold text-dark-2">
                      Choose cuisines:
                    </FormLabel>
                    <Autocomplete
                      size="small"
                      multiple
                      id="multiple-limit-tags"
                      limitTags={4}
                      options={cuisineOptions}
                      value={mapToStringArray(cuisineOptions, field.value)}
                      onChange={(event, newValue) => {
                        form.setValue(
                          "cuisines",
                          newValue.map((option) => option.name)
                        );
                      }}
                      getOptionLabel={(option) => option.name}
                      defaultValue={[
                        cuisineOptions[1],
                        cuisineOptions[2],
                        cuisineOptions[3],
                      ]}
                      renderInput={(params) => (
                        <TextField {...params} label="Cuisines" />
                      )}
                      sx={{ width: "500px" }}
                    />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="maxRadius"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className="text-base-semibold text-dark-2">
                    Max Radius
                  </FormLabel>
                  <FormControl>
                    <SliderComponent {...field} />
                  </FormControl>
                  <div className="flex flex-row gap-4 w-full justify-between">
                    {miles?.map((mile) => (
                      <p key={mile} className="text-small-regular">{mile} mi</p>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
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
        </Form>
      </div>
    </div>
  );
}
