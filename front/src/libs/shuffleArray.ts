/**
 * １時間おきに変わる乱数を生成する
 * @returns 乱数
 */
export const generateSeedFromDatetime = (): number => {
  const now = new Date();
  return Math.round(now.getTime() / (1000 * 3600));
};

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * 乱数を元に配列をシャッフルする
 */
export const shuffleArray = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array]; // 新しい配列を作成（元の配列を変更しない）

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
