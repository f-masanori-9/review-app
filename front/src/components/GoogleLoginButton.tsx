import { signIn } from "next-auth/react";

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: `/api/auth/callback/google`,
        })
      }
    >
      Googleでログイン
    </button>
  );
};
