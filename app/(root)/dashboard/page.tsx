"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useRouter } from "next/navigation";
import CreateForm from "@/components/forms/CreateForm";
import PostCard from "@/components/cards/PostCards";
import { Skeleton } from "@mui/material";
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
            {posts ? (
              posts?.map((post) => <PostCard key={post} post={post} />)
            ) : (
              <>
                {new Array(5).fill(0).map((skeleton, indx) => {
                  return (
                    <div key={indx} className="flex gap-4">
                      <Skeleton
                        key="circular"
                        variant="circular"
                        width={40}
                        height={40}

                      />
                      <Skeleton
                        key="rectangular"
                        variant="rectangular"
                        className="w-full"
                        height={40}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
