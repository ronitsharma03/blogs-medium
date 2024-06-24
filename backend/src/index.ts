import { Hono } from "hono";
// Since here nodejs runtime is not being used so the prisma client is imported from the edge
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
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

    const token: string = "JWT Token Here";

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



app.post("/api/v1/user/signin", (c) => {
  return c.text("Signin post route");
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
