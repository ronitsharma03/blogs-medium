import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middleware";
import { blogInput, updateBlogInput } from "@ronitkhajuria/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/create", authMiddleware, async (c) => {
  const body = await c.req.json();
  const { success } = blogInput.safeParse(body);
  if (!success) {
    return c.json(
      {
        message: "Check the inputs!",
      },
      { status: 411 }
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("userId");
    const createPost = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        imgageUrl: body.imageUrl,
        published: true,
        authorId: authorId,
      },
    });

    return c.json({
      message: "Blog published successfully",
      id: createPost.id,
      authorId: createPost.authorId,
    });
  } catch (e) {
    console.log(`Error publishing the blog ${e}`);
    return c.json(
      {
        message: "Failed to publish!",
      },
      { status: 403 }
    );
  }
});

blogRouter.put("/update", authMiddleware, async (c) => {
  const body = await c.req.json();

  const { success } = blogInput.safeParse(body);
  if (!success) {
    return c.json(
      {
        message: "Check the inputs!",
      },
      { status: 411 }
    );
  }

  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: body.title,
        content: body.content,
        imgageUrl: body.imageUrl,
        published: true,
      },
    });

    return c.json({
      message: "Blog updated successfully!",
      id: blogId,
    });
  } catch (e) {
    console.log(`Error while updating the blog ${e}`);
    return c.json(
      {
        message: "Error updating the Blog, try again!",
      },
      { status: 403 }
    );
  }
});

blogRouter.get("/allblogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.findMany({
      where: {
        published: true,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        },
        createdAt: true
      }
    });

    return c.json({
      message: "Welcome User",
      Blogs: response,
    });
  } catch (e) {
    console.log(`Error while finding blogs`);
    return c.json(
      {
        message: "No blogs found!",
      },
      { status: 403 }
    );
  }
});


blogRouter.get("/:id", authMiddleware, async (c) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true
          }
        },
        createdAt: true
      }
    });

    if (!response) {
      return c.json({
        message: "No Blog found",
      });
    }
    return c.json({
      message: "Blog found!",
      Blogs: response,
    });
  } catch (e) {
    console.log(`Error finding the blogs ${e}`);
    return c.json(
      {
        message: "No blog found!",
      },
      { status: 403 }
    );
  }
});