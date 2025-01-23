import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/core/providers/google';
import 'dotenv/config';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';

import { DrizzleD1Database } from 'drizzle-orm/d1';
import { notes, users } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { Note } from '../models/Note';
import { HTTPException } from 'hono/http-exception';
import { createFactory, createMiddleware } from 'hono/factory';
import { Environment } from './type';
import { patchNotesHandler } from './handlers/patchNotesHandler';
import { getNoteHandler } from './handlers/getNoteRoute';

const app = new Hono<Environment>();

app.use(
	'*',
	cors({
		origin: [
			'http://localhost:3000',
			'https://review-app-two-delta.vercel.app',
			'https://review-dqn8l8utd-fmasanori9s-projects.vercel.app',
		],
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization', 'referer', 'x-auth-return-redirect', 'X-CSRF-Token', 'X-api-key'],
		credentials: true,
	})
);

const setD1DrizzleMiddleware = createMiddleware(async (c, next) => {
	const d1Drizzle = drizzle(c.env.DB);
	c.set('d1Drizzle', d1Drizzle);
	await next();
});

app.use(setD1DrizzleMiddleware);

const verifyApiKey = createMiddleware(async (c, next) => {
	const apiKey = c.req.header('X-api-key');
	if (apiKey !== c.env.API_KEY) {
		return c.text('Unauthorized', 401);
	}
	await next();
});

app.use(verifyApiKey);

const setUserIdMiddleware = createMiddleware(async (c, next) => {
	const userId = c.req.header('X-User-Id');
	if (!userId) {
		return c.text('Unauthorized', 401);
	}
	c.set('userId', userId);
	await next();
});

app.use(setUserIdMiddleware);

app.onError((err, c) => {
	console.error(err);
	if (err instanceof HTTPException && err.status === 401) {
		return c.text('Unauthorized', 401);
	}

	return c.text('Other Error', 500);
});

export const getNotesRoute = app.get('/api/notes', async (c) => {
	const userId = c.get('userId');
	const d1Drizzle = c.get('d1Drizzle');

	const notes_ = await d1Drizzle
		.select()
		.from(notes)
		.where(eq(notes.userId, userId || ''));
	return c.json(notes_);
});

const postNotesSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export const postNotesRoute = app.post('/api/notes', zValidator('json', postNotesSchema), async (c) => {
	const userId = c.get('userId');
	console.log(userId);
	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');
	const note = Note.createNew({
		userId,
		title: body.title,
		content: body.content,
	});
	await d1Drizzle
		.insert(notes)
		.values([
			{
				id: note.id,
				userId: note.userId,
				title: note.title,
				content: note.content,
				createdAt: note.createdAt,
				updatedAt: note.updatedAt,
			},
		])
		.returning()
		.get();

	return c.json(note);
});

const signupByGoogleSchema = z.object({
	userId: z.string(),
	name: z.string(),
});
export const signupByGoogleRoute = app.post('/api/auth/signup/google', zValidator('json', signupByGoogleSchema), async (c) => {
	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');

	const existingUser = await d1Drizzle.select().from(users).where(eq(users.id, body.userId)).get();
	if (existingUser) {
		return c.json({ existingUser });
	}
	const res = await d1Drizzle
		.insert(users)
		.values([{ id: body.userId, name: body.name }])
		.get();
	return c.json({ res });
});

const route = app.patch('/api/note/:noteId', ...patchNotesHandler).get('/api/note/:noteId', ...getNoteHandler);

export { app, route };
