import { DrizzleD1Database } from 'drizzle-orm/d1';
import { tables } from '@/drizzle/schema';

type Bindings = {
	DB: D1Database;
};
export type Environment = {
	Bindings: Bindings;
	Variables: {
		d1Drizzle: DrizzleD1Database<typeof tables>;
		API_KEY: string;
		userId: string;
	};
};
