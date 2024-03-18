import * as z from "zod";

export const UserValidation = z.object({
  name: z.string().min(3).max(30),
  cuisines: z.array(z.string()).refine((cuisines) => cuisines.length > 0, {
    message: "Choose at least 1 cuisine.",
  }),
  maxRadius: z.any(),
  bio: z.string().min(3).max(30),
});
