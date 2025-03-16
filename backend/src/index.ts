import { app } from './presentator';
import { hc } from 'hono/client';
import { EndPointType } from './presentator/routeTypes';
export default app;

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const generateApiClient = <T extends Hono<any, any, any>>({ endpoint }: { endpoint: string }) => {
// 	return hc<T>(`${endpoint}`, {
// 		fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
// 			return fetch(input, {
// 				...requestInit,
// 				credentials: 'include', // NOTE: cookieに認証情報を含める
// 			});
// 		},
// 	});
// };

export const honoClient = hc<EndPointType>;
