import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middleware";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


blogRouter.post("/create", authMiddleware, (c) => {
  return c.text("Blog post route");
});

blogRouter.put("/update", authMiddleware, (c) => {
  return c.text("Blog put route");
});

blogRouter.get("/:username/:id", authMiddleware, (c) => {
  return c.text("Blog with id Get route");
});

blogRouter.get("/", (c) => {
  return c.text("All blog get route");
});
