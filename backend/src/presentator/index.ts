import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import 'dotenv/config';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/d1';

import { eq, and } from 'drizzle-orm';
import { Note } from '../models/Note';
import { HTTPException } from 'hono/http-exception';
import { createFactory, createMiddleware } from 'hono/factory';
import { Environment } from './type';
import { patchNotesHandler } from './handlers/patchNotesHandler';
import { getNoteHandler } from './handlers/getNoteRoute';
import { postNotesHandler } from './handlers/postNotesRoute';

import { usersTable } from '../../drizzle/schema';
import { postReviewLogHandler } from './handlers/postReviewLog';
import { deleteNoteRoute } from './handlers/deleteNoteRoute';
import { postVocabularyNoteHandler } from './handlers/postVocabularyNoteHandler';
import { getNotesHandler } from './handlers/getNotesHandler';
import { getVocabularyNoteHandler } from './handlers/getVocabularyNoteHandler';
import { patchVocabularyNotesHandler } from './handlers/patchVocabularyNotesHandler';

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
		allowHeaders: ['Content-Type', 'Authorization', 'referer', 'x-auth-return-redirect', 'X-CSRF-Token', 'X-api-key', 'X-User-Id'],
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

const signupByGoogleSchema = z.object({
	userId: z.string(),
	name: z.string(),
});

export const signupByGoogleRoute = app.post('/api/auth/signup/google', zValidator('json', signupByGoogleSchema), async (c) => {
	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');

	const existingUser = await d1Drizzle.select().from(usersTable).where(eq(usersTable.id, body.userId)).get();
	if (existingUser) {
		return c.json({ existingUser });
	}
	const res = await d1Drizzle
		.insert(usersTable)
		.values([{ id: body.userId, name: body.name }])
		.get();
	return c.json({ res });
});

const route = app
	.get('/api/note/:noteId', ...getNoteHandler)
	.get('/api/vocabulary-notes/:noteId', ...getVocabularyNoteHandler)
	.get('/api/notes', ...getNotesHandler)
	.post('/api/notes', ...postNotesHandler)
	.patch('/api/note/:noteId', ...patchNotesHandler)
	.patch('/api/vocabulary-notes/:noteId', ...patchVocabularyNotesHandler)
	.post('/api/review-logs', ...postReviewLogHandler)
	.post('/api/vocabulary-notes', ...postVocabularyNoteHandler)
	.delete('/api/note', ...deleteNoteRoute);

export { app, route };
