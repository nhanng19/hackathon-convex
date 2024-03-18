"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useRouter } from "next/navigation";
import CreateForm from "@/components/forms/CreateForm";
import PostCard from "@/components/cards/PostCards";

export default function Home() {
  const router = useRouter();
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  
  const posts = useQuery(api.post.getAllPosts);

  if (user?.onboarded == false) {
    router.push("/onboard");
  }
  return (
    <section className="main-container">
      <div className="w-full h-full max-w-4xl">
        <main>
          <CreateForm userId={userId} />
          <div className="flex flex-col gap-4">
            {posts?.map((post) => (
              <PostCard key={post} post={post} />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
