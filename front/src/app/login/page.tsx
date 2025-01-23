"use client";
import React, { useEffect } from "react";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { status } = useSession();
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
              const res = await signIn("google");
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

  return <AlreadyLoggedIn />;
}

const AlreadyLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/notes");
  }, [router]);

  return null;
};
