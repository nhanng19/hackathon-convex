import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useEffect } from "react";
import { toast } from "sonner";
import { determineNotifications } from "@/lib/utils";
import { useRouter } from "next/navigation";
const useNotifications = () => { 
    const router = useRouter();
    const matches = useQuery(api.matches.getMatches);
    useEffect(() => { 
        if (matches) { 
            for (const match of matches) { 
                if (determineNotifications(match)) { 
                    toast.success("You've got a match! ❤️", {
                      action: {
                        label: "See match",
                        onClick: () => router.push("/matches"),
                      },
                    });
                }
            }
        }
    }, [matches])
    return null;
}

export default useNotifications