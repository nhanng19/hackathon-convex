import { useQuery } from "convex/react";
import useStoreUserEffect from "./useStoreUser";
import { api } from "@/convex/_generated/api";
import {
    useState
} from "react";
const useGetMatches = () => {
  const userId = useStoreUserEffect();
  const matches = useQuery(api.matches.getUserMatches, {
    userId: userId,
  });
    const [matchee, setMatchee] = useState() 
  console.log(matches);
};
