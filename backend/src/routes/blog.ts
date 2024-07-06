import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middleware";
import { blogInput, updateBlogInput } from "@ronitkhajuria/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

blogRouter.post("/create", authMiddleware, async (c) => {
  const { title, content, imageUrl } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get('userId');
    const createPost = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        imgageUrl: imageUrl,
        published: true,
        authorId: authorId,
      }
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
  const { title, content, imageUrl } = await c.req.json();
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
        title: title,
        content: content,
        imgageUrl: imageUrl,
        published: true
      },
    });

    return c.json({
      message: "Blog updated successfully!",
      id: blogId,
    });

  } catch (e) {
    console.log(`Error while updating the blog ${e}`);
    return c.json({
      message: "Error updating the Blog, try again!",
    }, {status: 403});
  }
});

blogRouter.get("/:username/:id", authMiddleware, async (c) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.findFirst({
      where: {
        AND: [
        {id: blogId},
        {author: {
            username: c.req.param("username")
        }}
        ]
      }
    });

    if(!response){
        return c.json({
            message: "No Blog found"
        });
    }
    return c.json({
      message: "Blog found!",
      Blogs: response,
    });

  } catch (e) {
    console.log(`Error finding the blogs ${e}`);
    return c.json({
      message: "No blog found!",
    }, {status: 403});
  }
});

blogRouter.get("/allblogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const response = await prisma.blog.findMany({
        where: {
            published: true
        }
    });

    return c.json({
        message: "Welcome User",
        Blogs: response
    });
  }catch(e){
    console.log(`Error while finding blogs`);
    return c.json({
        message: "No blogs found!"
    }, {status: 403});
  }
});
