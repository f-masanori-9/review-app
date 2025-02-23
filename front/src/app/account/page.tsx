"use client";
import { useSignOut } from "@/hooks/useSignOut";
import React from "react";

export default function Account() {
  const { signOut } = useSignOut();

  return (
    <div>
      <div>[wip]アカウントページ</div>
      <button onClick={() => signOut()}>ログアウト</button>
    </div>
  );
}
