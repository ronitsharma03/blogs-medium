import { Hono } from "hono";
// Since here nodejs runtime is not being used so the prisma client is imported from the edge

import authMiddleware from "./middleware";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter); 

app.get("/api/v1", (c) => {
  return c.text("Hello Hono!");
});





export default app;
