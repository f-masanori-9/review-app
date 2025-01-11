import { signIn } from "next-auth/react";

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn("google", {
          redirectTo: `/api/auth/callback/google`,
        })
      }
    >
      Googleでログイン
    </button>
  );
};
