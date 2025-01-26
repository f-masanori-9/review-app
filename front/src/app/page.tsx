"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <div>メモアプリだよ</div>{" "}
      <div>{session ? "ログイン中" : "ログアウト中"}</div>
      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        ログインはこちら
      </button>
    </>
  );
}
