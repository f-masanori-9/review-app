import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authConfig } from "@/auth";
import { StatusCode } from "hono/utils/http-status";

const app = new Hono().basePath("/api");

// NOTE: GET以外のリクエストボディはJSONであることを前提としている（もしJSON以外を使う場合は、その都度設定を変える）
app.all("*", async (c) => {
  const session = await authConfig.auth();
  // TODO: セッションがなかったら

  const reqMethod = c.req.method;
  const response = await fetch(`http://localhost:8787${c.req.path}`, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: reqMethod === "GET" ? undefined : await c.req.json(),
  });

  let headers: Record<string, string | string[]> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return c.newResponse(response.body, response.status as StatusCode, {
    "Content-Type": response.headers.get("Content-Type") || "",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
