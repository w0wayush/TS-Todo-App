import { z } from "zod";
export const signupInput = z.object({
  username: z.string().min(1).max(20).email("This is not a valid email."),
  password: z.string().min(1).max(15),
});
// console.log("hi there");

export const todoInputProps = z.object({
  title: z.string().min(2).max(25),
  description: z.string().min(5).max(75),
});

export type TodoParams = z.infer<typeof todoInputProps>;
export type SignupParams = z.infer<typeof signupInput>;
