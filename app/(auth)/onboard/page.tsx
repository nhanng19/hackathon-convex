import AccountForm from "@/components/forms/AccountForm";
import { currentUser } from "@clerk/nextjs";

export default async function Onboard() {
  const user = await currentUser();

  const userData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddresses[0].emailAddress || "",
  };

  return (
    <main>
      <AccountForm user={userData} />
    </main>
  );
}
