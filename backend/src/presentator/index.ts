import { Hono } from 'hono';
import 'dotenv/config';
import { cors } from 'hono/cors';

import { HTTPException } from 'hono/http-exception';
import { Environment } from './type';
import { patchNotesHandler } from './handlers/patchNotesHandler';
import { getNoteHandler } from './handlers/getNoteRoute';
import { postNotesHandler } from './handlers/postNotesRoute';

import { postReviewLogHandler } from './handlers/postReviewLog';
import { deleteNoteRoute } from './handlers/deleteNoteRoute';
import { postVocabularyNoteHandler } from './handlers/postVocabularyNoteHandler';
import { getNotesHandler } from './handlers/getNotesHandler';
import { getVocabularyNoteHandler } from './handlers/getVocabularyNoteHandler';
import { patchVocabularyNotesHandler } from './handlers/patchVocabularyNotesHandler';
import { getVocabularyNotesHandler } from './handlers/getVocabularyNotesHandler';
import { postVocabularyNoteReviewLogHandler } from './handlers/VocabularyNote/postVocabularyNoteReviewLogHandler';
import { setD1DrizzleMiddleware } from './middlewares/setD1DrizzleMiddleware';
import { verifyApiKey } from './middlewares/verifyApiKeyMddleware';
import { setUserIdMiddleware } from './middlewares/setUserIdMiddleware';
import { postSignupGoogleHandler } from './handlers/Auth/postSignupGoogleHandler';

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

app.use(setD1DrizzleMiddleware);
app.use(verifyApiKey);
app.use(setUserIdMiddleware);
app.onError((err, c) => {
	console.error(err);
	if (err instanceof HTTPException && err.status === 401) {
		return c.text('Unauthorized', 401);
	}

	return c.text('Other Error', 500);
});

const route = app
	.get('/api/note/:noteId', ...getNoteHandler)
	.get('/api/vocabulary-notes/:noteId', ...getVocabularyNoteHandler)
	.get('/api/vocabulary-notes', ...getVocabularyNotesHandler)
	.get('/api/notes', ...getNotesHandler)
	.post('/api/notes', ...postNotesHandler)
	.patch('/api/note/:noteId', ...patchNotesHandler)
	.patch('/api/vocabulary-notes/:noteId', ...patchVocabularyNotesHandler)
	.post('/api/review-logs', ...postReviewLogHandler)
	.post('/api/vocabulary-notes', ...postVocabularyNoteHandler)
	.post('/api/vocabulary-notes/review-log', ...postVocabularyNoteReviewLogHandler)
	.post('/api/auth/signup/google', ...postSignupGoogleHandler)
	.delete('/api/note', ...deleteNoteRoute);

export { app, route };
