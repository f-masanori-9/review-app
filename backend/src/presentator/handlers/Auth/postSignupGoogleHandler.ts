import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createHandlers } from '../../../presentator/utils/factory';
import { usersTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

const bodySchema = z.object({
	userId: z.string(),
	name: z.string(),
});
export const postSignupGoogleHandler = createHandlers(zValidator('json', bodySchema), async (c) => {
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
