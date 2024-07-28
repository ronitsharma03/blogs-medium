import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
// import { Buffer } from "buffer";
import { verifyPassword, hashPassword } from "../webCrypto";
import { signinInput, signupInput } from "@ronitkhajuria/medium-common";
import authMiddleware from "../middleware";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// export async function hashFunction(message: string): Promise<string> {
//   const encodedMsg = new TextEncoder().encode(message);
//   const msgDigest = await crypto.subtle.digest(
//     {
//       name: "SHA-256",
//     },
//     encodedMsg
//   );
//   const base64String = Buffer.from(msgDigest).toString("base64");
//   return base64String;
// }

userRouter.post("/signup", async (c) => {
  // In serverless backend one should avoid the use of global variables as possible because depending upon the runtime
  // they just start the specific function somewhere so you may loose the global context
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // const { success } = signupInput.safeParse(body);

  // if(!success){
  //   return c.json({
  //       message: "Wrong Inputs!"
  //   }, {status: 403});
  // }

  try {
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
    return c.json({
      message: "Signup Successful",
      token: token,
    });
  } catch (error) {
    console.error(`Error signing up ${error}`);
    return c.json(
      {
        message: "Error signing up",
        error: error,
      },
      { status: 404 }
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
        email: body.email,
      },
    });

    if (!user) {
      c.status(411);
      return c.json({
        message: "User not found!",
      });
    }

    // Verifying the password
    const hashedPassword = await verifyPassword(body.password, user.password);

    if (!hashedPassword) {
      c.status(403);
      return c.json({
        message: "Password is incorrect",
      });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

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

userRouter.get("/me", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      blogs: {
        select: {
          title: true,
          content: true,
          createdAt: true,
          id: true,
        },
      },
    },
  });

  if (!response) {
    return c.json({
      message: "User not found!",
      id: userId,
    });
  }
  const username = response.username;
  const email = response.email;
  const name = response.name;
  const bio = response.bio;
  const profilePic = response.profile_pic;

  return c.json(
    {
      message: "You are logged in!",
      id: userId,
      username: username,
      email: email,
      name: name,
      bio: bio,
      profilePic: profilePic,
      blogs: response.blogs
    },
    { status: 200 }
  );
});

userRouter.put("/update", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const {bio} = await c.req.json();
    const userId = c.get("userId");

    if (typeof bio !== 'string' || bio.trim() === '') {
      return c.json({
        message: "Invalid bio format"
      }, { status: 400 });
    }
    
    const response = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        bio: bio
      }
    });

    if(!response){
      return c.json({
        message: "Error updating bio"
      }, {status: 404});
    }

    return c.json({
      message: "Bio updated successfully"
    });

  }catch(e){
    return c.json({
      message: "Error updating bio"
    }, {status: 500});
  }
});
