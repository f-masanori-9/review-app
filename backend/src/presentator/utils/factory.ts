import { createFactory } from 'hono/factory';
import { Environment } from '../type';

export const createHandlers = createFactory<Environment>().createHandlers;
