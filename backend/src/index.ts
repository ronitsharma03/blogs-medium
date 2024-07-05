import { Hono } from "hono";
// Since here nodejs runtime is not being used so the prisma client is imported from the edge
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  };
}>();

app.get("/api/v1", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  // In serverless backend one should avoid the use of global variables as possible because depending upon the runtime
  // they just start the specific function somewhere so you may loose the global context
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password, name } = await c.req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return c.text("User already exist");
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });

    const token = await sign({id: newUser.id}, c.env.JWT_SECRET );

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



app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const {email, password } = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if(!user){
      c.status(411);
      return c.json({
        message: "User not found!"
      });
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET);

    return c.json({
      message: "Log in successfull!",
      token: token
    });

  }catch (e){
    console.log(`Error while signing in ${e}`);
    
    c.status(403);
    return c.json({
      message: "Erro while logging!"
    });
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("Blog post route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Blog put route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Blog with id Get route");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Bulk blog get route");
});

export default app;
