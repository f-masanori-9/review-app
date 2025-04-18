"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="relative h-96 flex items-center justify-center overflow-hidden ">
        {/* 背景画像 */}
        <Image
          src="/landing_background.png"
          alt="Space background"
          fill
          className="object-cover opacity-20"
        />

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-amber-200 opacity-20"></div>

        {/* コンテンツ */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center">Revi Notesとは</h1>

          <h4 className="text-center mt-4">
            ReviNotesは、「復習の回数」を見える化
            し、効率的な学習をサポートするアプリです。
            語学の単語はもちろん、資格試験の用語、仕事の知識、趣味のスキルなど、あらゆる学習内容を記録し、効果的に復習
            できます。
          </h4>
          <h4 className="text-center mt-4">
            「どれを何回復習したか」が一目でわかるから、忘れやすいポイントを重点的に学習可能。
            スキマ時間を活用しながら、あなたの知識を確実に積み上げていきましょう！
          </h4>
        </div>
      </div>
      <div className="relative h-96 ">
        {/* オーバーレイ */}
        <div className="absolute inset-0  bg-primary opacity-20"></div>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center">今すぐ始めよう</h2>

          {/* 登録ボタン */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-primary px-4 py-2 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
