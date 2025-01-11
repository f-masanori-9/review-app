import { signIn } from "next-auth/react";

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn(
          "google",
          {
            callbackUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/api/auth/callback/google`,
          },
          { prompt: "login" }
        )
      }
    >
      Googleでログイン
    </button>
  );
};
