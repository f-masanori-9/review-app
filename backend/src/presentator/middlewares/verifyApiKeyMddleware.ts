import 'dotenv/config';

import { createMiddleware } from 'hono/factory';

export const verifyApiKey = createMiddleware(async (c, next) => {
	const apiKey = c.req.header('X-api-key');
	if (apiKey !== c.env.API_KEY) {
		return c.text('Unauthorized', 401);
	}
	await next();
});
