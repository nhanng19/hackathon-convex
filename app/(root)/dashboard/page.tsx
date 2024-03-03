"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  if (user?.onboarded == false) {
    router.push("/onboard");
  }
  return <main>Home</main>;
}
