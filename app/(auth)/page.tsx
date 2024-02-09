"use client"
import { useConvexAuth } from "convex/react";
import { SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import { SignIn } from "@clerk/clerk-react";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const store = useStoreUserEffect();
  const router = useRouter()

  if (isLoading) { 
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    router.push("/dashboard");
  } else { 
      return (
        <main className="flex flex-col items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-4 justify-center">
            <Image src="/assets/logo.svg" alt="logo" width={50} height={50} />
            <p className="text-heading3-bold text-light-1 max-xs:hidden">
              Fooder
            </p>
          </Link>
          <SignIn />
        </main>
      );
  }
}
