import { app } from './presentator';

export default app;

// TODO: 適切なディレクトリを作って移動
declare global {
	interface Array<T> {
		shuffle(seed: number): T[];
	}
}

const seededRandom = (seed: number) => {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
};

Array.prototype.shuffle = function <T>(this: T[], seed: number): T[] {
	const shuffled = [...this]; // 新しい配列を作る（元の配列を変更しない）

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(seededRandom(seed + i) * (i + 1));
		[shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
	}

	return shuffled;
};
