import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/core/providers/google';
import 'dotenv/config';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';

type Bindings = {
	DB: D1Database;
};

const attachGetNotesRoute = (
	app: Hono<{
		Bindings: Bindings;
	}>
) => {
	app.get('/api/notes', verifyAuth(), async (c) => {
		const auth = c.get('authUser');
		return c.text(`Hello, ${auth.session.user?.name}`);
	});
};
