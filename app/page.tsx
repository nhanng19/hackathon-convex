"use client"
import { useConvexAuth } from "convex/react";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { SignIn } from "@clerk/clerk-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) { 
    return <div>Loading...</div>
  }
  console.log(isAuthenticated)

  return (
    <main>  
      {isAuthenticated ?  <SignOutButton /> : <SignIn />}
    </main>
  )
}
