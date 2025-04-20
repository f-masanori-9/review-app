"use client";
import { useSignOut } from "@/hooks/useSignOut";
import { useSession } from "next-auth/react";
import React from "react";

export default function Account() {
  const { signOut } = useSignOut();
  const { data } = useSession();
  const user = data?.user;

  return (
    <main className="flex-1 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">アカウント情報</h2>
          <p className="text-gray-600">メールアドレス: {user?.email}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">アクション</h2>

          <button
            className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 text-red-500 font-medium"
            onClick={() => signOut()}
          >
            ログアウト
          </button>
        </div>
      </div>
    </main>
  );
}
