import { authConfig } from "@/auth";

export const GoogleLoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await authConfig.signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </form>
  );
};
