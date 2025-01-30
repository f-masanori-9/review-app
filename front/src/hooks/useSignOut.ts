import { signOut as signOutNextAuth } from "next-auth/react";
import { useCallback } from "react";

export const useSignOut = () => {
  const signOut = useCallback(async () => {
    await signOutNextAuth();
  }, []);

  return { signOut };
};
