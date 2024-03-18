"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import useStoreUserEffect from "@/hooks/useStoreUser";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const userId = useStoreUserEffect();

  if (!userId) return null;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-2 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link ${
                isActive
                  ? "bg-[#3e567c] hover:bg-[#3e567c]"
                  : "hover:bg-slate-700"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={32}
                height={32}
              />
              <p className="text-light-1 max-lg:hidden flex items-center">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logoutt"
                width={32}
                height={32}
              />
              <p className="text-light-2 max-lg:hidden flex items-center">
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
