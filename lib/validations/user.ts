import * as z from "zod";

export const UserValidation = z.object({
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    emailAddress: z.string().min(3).max(30)
})