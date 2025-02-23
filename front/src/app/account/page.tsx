"use client";
import { useSignOut } from "@/hooks/useSignOut";
import React from "react";

export default function Account() {
  const { signOut } = useSignOut();

  return (
    <div className="p-4 w-full">
      <h1>アカウント</h1>
      <button onClick={() => signOut()}>ログアウト</button>
    </div>
  );
}
