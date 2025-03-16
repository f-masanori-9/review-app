import { drizzle } from 'drizzle-orm/d1';
import { tables } from 'drizzle/schema';

import { createMiddleware } from 'hono/factory';

export const setD1DrizzleMiddleware = createMiddleware(async (c, next) => {
	const d1Drizzle = drizzle(c.env.DB, {
		schema: tables,
	});
	c.set('d1Drizzle', d1Drizzle);
	await next();
});
