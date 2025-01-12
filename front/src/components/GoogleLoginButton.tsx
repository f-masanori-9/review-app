import { signIn } from "@hono/auth-js/react";

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
