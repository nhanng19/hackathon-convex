import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link href="/dashboard" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Fooder</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
            <SignedIn>
                <SignOutButton>
                    <div className="flex cursor-pointer">
                        <Image src="/assets/logout.svg" alt="logoutt" width={24} height={24}/>
                    </div>
                </SignOutButton>
            </SignedIn>
        </div>
        <UserButton />
      </div>

    </nav>
  );
};

export default Topbar;
