import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authConfig } from "@/auth";
import { StatusCode } from "hono/utils/http-status";

const app = new Hono().basePath("/api");

// NOTE: GET以外のリクエストボディはJSONであることを前提としている（もしJSON以外を使う場合は、その都度設定を変える）
app.all("*", async (c) => {
  const session = await authConfig.auth();
  const userId = session?.user?.id;
  // TODO: セッションがなかったら
  if (!userId) {
    return c.newResponse(JSON.stringify({ message: "Unauthorized" }), 401, {
      "Content-Type": "application/json",
    });
  }

  const reqMethod = c.req.method;
  // const reqHeaders = new Headers(c.req.raw.headers);
  // reqHeaders.append("X-User-Id", userId);
  // reqHeaders.append("X-api-key", process.env.API_KEY || "");
  const response = await fetch(
    `${process.env.INTERNAL_ENDPOINT}${c.req.path}?test=nocache`,
    {
      method: c.req.method,
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": userId,
        "X-api-key": process.env.API_KEY || "",
      },
      body: reqMethod === "GET" ? undefined : await c.req.raw.text(),
      cache: "no-store",
    }
  );

  return c.newResponse(response.body, response.status as StatusCode, {
    "Content-Type": response.headers.get("Content-Type") || "",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
