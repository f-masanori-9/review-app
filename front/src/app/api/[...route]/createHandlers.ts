import { createFactory } from "hono/factory";
import { HoneEnv } from "./requestedUserMiddleware";

export const createHandlers = createFactory<HoneEnv>().createHandlers;
