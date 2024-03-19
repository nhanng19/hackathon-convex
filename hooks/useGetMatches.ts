import { useQuery } from "convex/react";
import useStoreUserEffect from "./useStoreUser";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { getMatchee } from "@/lib/utils";
const useGetMatches = () => {
  const userId = useStoreUserEffect();
  const user = useQuery(api.user.getSingleUser, {
    userId: userId,
  });
  const matches = useQuery(api.matches.getUserMatches, {
    userId: userId,
  });
  const [matchee, setMatchee] = useState<any[]>();
  useEffect(() => {
    if (matches) {
      let data = [];
      for (const match of matches) {
        data.push(getMatchee(match, userId));
      }
      setMatchee(data);
    }
  }, [matches, userId]);
  return { user, userId, matchee };
};

export default useGetMatches;
