"use client";
import React from "react";

import { useSession, signIn } from "@hono/auth-js/react";

export default function Login() {
  const { data: session, status } = useSession();
  // return <div>Loading...</div>;
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button
          onClick={async () => {
            try {
              const res = await signIn("google", {
                callbackUrl: `/afterGoogleAuth`,
              });
              console.log(res);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Googleでログイン
        </button>
      </div>
    );
  }

  return <>ログインしてます{JSON.stringify(session)}</>;
}
