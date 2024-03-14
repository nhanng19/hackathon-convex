import AccountForm from "@/components/forms/AccountForm";
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/hooks/useStoreUser";
import { useQuery } from "convex/react";
import { currentUser } from "@clerk/nextjs";


const ProfileForm = async() => {

  
  const userCurrent = await currentUser();

  const userData = {
    firstName: userCurrent?.firstName || "",
    lastName: userCurrent?.lastName || "",
    emailAddress: userCurrent?.emailAddresses[0].emailAddress || "",
    imageUrl: userCurrent?.imageUrl,
  };

  return (
              <AccountForm user={userData} title={"Fooder!"} subtitle={"Change your Settings"}/>
  );
};

export default ProfileForm;

// name,picture, cuisines, resturant to swipe on, gear settings icon for form for onboarding 