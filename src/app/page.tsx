"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center overflow-hidden ">
      {/* 背景画像 */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="max-w-4xl w-full p-8">
          {/* Main Content */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h1 className="text-5xl font-bold text-navy pb-2 whitespace-nowrap">
                ReviNotes
              </h1>
              <Image
                src="/icon512_maskable.png"
                alt="homeIcon"
                height={90}
                width={90}
              />
            </div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-3xl font-bold text-navy pb-2 whitespace-nowrap">
                復習を可視化し、
                <br />
                効率的な学習をサポート
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              ReviNotes
              は、「復習の回数」を見える化し、効率的な学習をサポートするアプリです。語学の単語はもちろん、資格試験の用語、仕事の知識、趣味のスキルなど、あらゆる学習内容を記録し、効果的に復習できます。
            </p>
            <p className="text-lg text-gray-700 mb-8">
              「どれを何回復習したか」が一目でわかるから、忘れやすいポイントを重点的に学習可能。スキマ時間を活用しながら、あなたの知識を確実に積み上げていきましょう！
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
