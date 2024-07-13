import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { verifyPassword, hashPassword } from "../webCrypto";
import { signinInput, signupInput } from "@ronitkhajuria/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "Wrong Inputs!",
      },
      { status: 403 }
    );
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });
    console.log(existingUser);

    if (existingUser) {
      return c.json(
        {
          message: "Email or username already exist",
        },
        { status: 403 }
      );
    } else {
      const hashedPassword = await hashPassword(body.password);
      const newUser = await prisma.user.create({
        data: {
          email: body.email,
          username: body.username,
          password: hashedPassword,
          name: body.name,
        },
      });

      const token = await sign(
        { id: newUser.id, username: body.username },
        c.env.JWT_SECRET
      );

      console.log(newUser);
      return c.json(
        {
          message: "Signup Successful",
          token: token,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(`Error signing up: ${error}`);
    return c.json(
      {
        message: "Error signing up!",
        error: error,
      },
      { status: 500 }
    );
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    // const { success } = signinInput.safeParse(body);

    // if(!success){
    //   return c.json({
    //     message: "Check inputs!"
    //   }, {status: 411});
    // }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.emailorUsername },
          { username: body.emailorUsername },
        ],
      },
    });

    if (!user) {
      c.status(411);
      return c.json({
        message: "User not found!",
      });
    }

    // Verifying the password
    const isValidPassword = await verifyPassword(body.password, user.password);

    if (!isValidPassword) {
      c.status(403);
      return c.json({
        message: "Password is incorrect",
      });
    }

    const token = await sign(
      { id: user.id, username: body.emailorUsername },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "Log in successful!",
      token: token,
    });
  } catch (e) {
    console.log(`Error while signing in: ${e}`);

    c.status(403);
    return c.json({
      message: "Error while logging!",
      error: e,
    });
  }
});
