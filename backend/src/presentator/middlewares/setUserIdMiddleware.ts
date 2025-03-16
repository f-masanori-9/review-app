import { createMiddleware } from 'hono/factory';

export const setUserIdMiddleware = createMiddleware(async (c, next) => {
	const userId = c.req.header('X-User-Id');
	if (!userId) {
		return c.text('Unauthorized', 401);
	}
	c.set('userId', userId);
	await next();
});
