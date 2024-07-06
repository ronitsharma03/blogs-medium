import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const authMiddleware = createMiddleware<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    loggedUsername: any;
    userId: any;
  };
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization") || " ";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      {
        message: "Please login ! ",
      },
      { status: 403 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await verify(token, c.env.JWT_SECRET);

    if (!decodedToken.id && !decodedToken.username) {
      return c.json(
        {
          message: "Not authorized",
        },
        { status: 403 }
      );
    }

    c.set("loggedUsername", decodedToken.username);
    c.set("userId", decodedToken.id);

    await next();
  } catch (e) {
    console.error(`Authentication failed: ${e}`);
    return c.json(
      {
        message: "Authentication failed",
      },
      { status: 403 }
    );
  }
});

export default authMiddleware;
