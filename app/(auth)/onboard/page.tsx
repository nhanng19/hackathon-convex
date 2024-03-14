import AccountForm from "@/components/forms/AccountForm";
import { currentUser } from "@clerk/nextjs";

export default async function Onboard() {
  const user = await currentUser();

  const userData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddresses[0].emailAddress || "",
    imageUrl: user?.imageUrl,
  };

  return (
    <main>
      <AccountForm user={userData} title={"Welcome to Fooder!"} subtitle={"Complete your onboarding to continue."}/>
    </main>
  );
}
