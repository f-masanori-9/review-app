import { defineConfig } from 'drizzle-kit';

const common = {
	dialect: 'sqlite',
	out: './drizzle/migrations',
	schema: './drizzle/schema.ts',
} as const;
export default process.env.LOCAL_DB_PATH
	? defineConfig({
			...common,
			dbCredentials: {
				url: process.env.LOCAL_DB_PATH!,
			},
	  })
	: defineConfig({
			...common,
			driver: 'd1-http',
	  });
