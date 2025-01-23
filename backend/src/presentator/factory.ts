import { createFactory } from 'hono/factory';
import { Environment } from './type';

export const factory = createFactory<Environment>();
