"use client";
import Image from "next/image";
import RangeSlider from "./RangeSlider";
import { currentUser } from "@clerk/nextjs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SliderComponent } from "@/components/ui/slider";
import { cuisineOptions } from "@/constants";
const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
  { id: 4, name: "Option 4" },
  { id: 5, name: "Option 5" },
  { id: 6, name: "Option 6" },
];

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
  maxRadius: number;
}

export default function AccountForm({ user }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      emailAddress: user?.emailAddress || "",
      phone: "",
      bio: "",
      cuisines: [],
      maxRadius: 50,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log(values);
  };

  const mapToStringArray = (options, values) => {
    return options.filter((option) => values.includes(option.name));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div className="bg-white py-8 px-6 rounded-lg sm:px-10">
        <div className="sm:mx-auto sm:w-full flex flex-col items-start mb-8">
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-0 space-y-6"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-dark-2">
                      First Name
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
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-dark-2">
                      Last Name
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
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-dark-2">
                      Email
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-dark-2">
                      Phone Number
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
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                  <FormLabel className="text-base-semibold text-dark-2">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
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
                console.log(field)
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
