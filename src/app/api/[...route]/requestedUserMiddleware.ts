import { authConfig } from "@/auth";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { User } from "next-auth";

export type HoneEnv = {
  Variables: {
    user: User & {
      id: string;
    };
  };
};
export const requestedUserMiddleware = createMiddleware<HoneEnv>(
  async (c, next) => {
    const session = await authConfig.auth();
    const user = session?.user;

    if (!user || !user.id) {
      throw new HTTPException(401);
    }

    c.set("user", {
      ...user,
      id: user.id,
    });
    await next();
  }
);
