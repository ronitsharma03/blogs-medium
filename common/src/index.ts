import z from "zod";

export const signupInput = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(4).max(20),
  bio: z.string().min(20).max(100).optional(),
  profile_pic: z.string().url().optional(),
});

export type SignupType = z.infer<typeof signupInput>;



// Define regex for validating email and username
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // example: alphanumeric and underscore, 3-20 characters

export const signinInput = z.object({
    emailorusername: z.string().refine(
        (value) => {
            return emailRegex.test(value) || usernameRegex.test(value);
        },
        {
            message: "Must be a valid email or username",
        }
    ),
    password: z.string(),
});
export type SigninType = z.infer<typeof signinInput>;


export const blogInput = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 4 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  content: z
  .string()
  .min(50, { message: "Content must be at least 50 characters long" })
  .max(5000, { message: "Content must be at most 5000 characters long" }),
  imageUrl: z.string().url({ message: "Must be a valid URL" }).optional(),
});

export type BlogType = z.infer<typeof blogInput>;


export const updateBlogInput = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters long" })
    .max(5000, { message: "Content must be at most 5000 characters long" }),
  imageUrl: z.string().url({ message: "Must be a valid URL" }).optional(),
});

export type UpdateBlogType = z.infer<typeof updateBlogInput>;
