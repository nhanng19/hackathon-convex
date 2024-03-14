"use client";

import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useQuery } from "convex/react";
import { currentUser } from "@clerk/nextjs";
import ProfileForm from "@/components/forms/profileForm";

// add onClick event to open ProfileForm settings


const Profile = () => {
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  
  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        <main className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-grey-900">
              {user?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {/* <ProfileForm/> */}
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;

// name,picture, cuisines, resturant to swipe on, gear settings icon for form for onboarding 