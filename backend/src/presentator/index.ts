import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

const sampleSchema = z.object({
	id: z.number(),
	name: z.string(),
});

const route = app.get('/', zValidator('json', sampleSchema), (c) => {
	return c.json({ message: 'Hello, World!' });
});

type Route = typeof route;

export { app };
