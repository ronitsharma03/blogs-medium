import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { verifyPassword, hashPassword } from "../webCrypto";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}
>();

userRouter.post("/signup", async (c) => {
  // In serverless backend one should avoid the use of global variables as possible because depending upon the runtime
  // they just start the specific function somewhere so you may loose the global context
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password, name } = await c.req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
            {email: email}
        ]
      },
    });

    if (existingUser) {
      return c.json({
        message: "Email already exist",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

    console.log(newUser);
    return c.json({
      message: "Signup Successful",
      token: token,
    });
  } catch (error) {
    console.error(`Error signing up ${error}`);
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { email, password } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      c.status(411);
      return c.json({
        message: "User not found!",
      });
    }

    // Verifying the password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      c.status(403);
      return c.json({
        message: "Password is incorrect",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Log in successfull!",
      token: token,
    });
  } catch (e) {
    console.log(`Error while signing in ${e}`);

    c.status(403);
    return c.json({
      message: "Error while logging!",
    });
  }
});


