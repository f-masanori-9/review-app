import { signIn } from "next-auth/react";

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn(
          "google",
          {
            callbackUrl: "http://localhost:8787/api/auth/callback/google",
          },
          { prompt: "login" }
        )
      }
    >
      Googleでログイン
    </button>
  );
};
