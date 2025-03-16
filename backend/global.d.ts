declare type ExcludeMethods<T> =
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;
