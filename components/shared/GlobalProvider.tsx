"use client"
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { Id } from "@/convex/_generated/dataModel";

const GlobalProvider = (props: React.PropsWithChildren) => {
  const updateUserProfileMutation = useMutation(api.user.updateUserProfile);
  const userId = useStoreUserEffect();

  // useEffect(() => {
  //   if (userId) {
  //     const updateLastSeenOn = () => {
  //       updateUserProfileMutation({
  //         id: userId as Id<"user">,
  //         userData: {
  //           lastSeenOn: Math.floor(Date.now() / 1000),
  //         },
  //       });
  //     };
  //     const intervalId = setInterval(updateLastSeenOn, 10000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [userId, updateUserProfileMutation]);

  return props.children;
};

export default GlobalProvider;
