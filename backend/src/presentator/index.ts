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
import { notes } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { Note } from '../models/Note';
import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory';
import { UpdateNoteUseCase } from '../usecases/UpdateNoteUseCase';
import { NoteRepository } from '../repositories/NoteRepository';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{
	Bindings: Bindings;
	Variables: {
		d1Drizzle: DrizzleD1Database<Record<string, never>>;
		AUTH_SECRET: string;
	};
}>();

app.use(
	'*',
	cors({
		origin: ['http://localhost:3000', 'https://review-app-two-delta.vercel.app'], // TODO 本番環境用を追加
		credentials: true,
	})
);

const setD1DrizzleMiddleware = createMiddleware(async (c, next) => {
	const d1Drizzle = drizzle(c.env.DB);
	c.set('d1Drizzle', d1Drizzle);
	await next();
});

app.use(setD1DrizzleMiddleware);

app.use(
	'*',
	initAuthConfig((c) => {
		return {
			secret: c.env.AUTH_SECRET,
			adapter: DrizzleAdapter(drizzle(c.env.DB)),
			providers: [
				Google({
					clientId: c.env.GOOGLE_ID,
					clientSecret: c.env.GOOGLE_SECRET,
				}),
			],
			session: {
				strategy: 'jwt',
			},
			pages: {
				signIn: '/auth/signin',
				signOut: '/auth/signout',
				error: '/auth/error', // エラーページ
				verifyRequest: '/auth/verify-request', // 確認メール送信後のページ
			},
		};
	})
);

app.onError((err, c) => {
	console.error(err);
	if (err instanceof HTTPException && err.status === 401) {
		return c.text('Unauthorized', 401);
	}

	return c.text('Other Error', 500);
});

app.use('/api/auth/*', authHandler());
app.get('/afterGoogleAuth', verifyAuth(), (c) => {
	// localhost1:3000 にリダイレクト
	return c.redirect('http://localhost:3000');
});

export const getNotesRoute = app.get('/api/notes', verifyAuth(), async (c) => {
	const auth = c.get('authUser');
	const userId = auth.token?.sub;
	const d1Drizzle = c.get('d1Drizzle');
	const notes_ = await d1Drizzle
		.select()
		.from(notes)
		.where(eq(notes.userId, userId || ''));
	return c.json(notes_);
});

export const getNoteRoute = app.get('/api/note/:noteId', verifyAuth(), async (c) => {
	const userId = c.get('authUser').token?.sub;
	const noteId = c.req.param('noteId');
	const d1Drizzle = c.get('d1Drizzle');
	const note = (
		await d1Drizzle
			.select()
			.from(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, userId || '')))
	)[0];
	return c.json(note);
});

const postNotesSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export const postNotesRoute = app.post('/api/notes', verifyAuth(), zValidator('json', postNotesSchema), async (c) => {
	const auth = c.get('authUser');
	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');
	const note = Note.createNew({
		userId: auth.token?.sub || '',
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

const patchNotesSchema = z.object({
	noteId: z.string(),
	content: z.string(),
});

export const patchNotesRoute = app.patch('/api/note/:noteId', verifyAuth(), zValidator('json', patchNotesSchema), async (c) => {
	const usecase = new UpdateNoteUseCase(new NoteRepository(c.get('d1Drizzle')));
	const userId = c.get('authUser').token?.sub;
	const noteId = c.req.param('noteId');
	const result = await usecase.execute({
		userId: userId || '',
		noteId,
		content: c.req.valid('json').content,
	});
	return c.json(result);
});

export { app };
