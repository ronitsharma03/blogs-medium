import { Context, MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

const authMiddleware: MiddlewareHandler = async (c: Context, next: () => Promise<void>) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({
            message: "Access not granted"
        }, { status: 403 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await verify(token, c.env.JWT_SECRET);
        
        if (!decodedToken.id) {
            return c.json({
                message: "Not authorized"
            }, { status: 403 });
        }

        await next();
        
    } catch (e) {
        console.error(`Authentication failed: ${e}`);
        return c.json({
            message: "Authentication failed"
        }, { status: 403 });
    }
};


export default authMiddleware;