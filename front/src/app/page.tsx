"use client";
import { useSession } from "@hono/auth-js/react";
import { hc } from "hono/client";
import {
  GetNotesRoute,
  PostNotesRoute,
} from "../../../backend/src/presentator";
import { useEffect } from "react";
import { Hono } from "hono";
import { generateApiClient } from "@/libs/apiClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  // return <div>Loading...</div>;
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <>
        ログインしてます{JSON.stringify(session)}
        <SampleCOmp />
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
}

const NotLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return <div>ログインしてません</div>;
};

const SampleCOmp = () => {
  const sampleOnClick = async () => {
    const client = generateApiClient<PostNotesRoute>();

    const res = await client.api.notes.$post({
      json: {
        title: "title",
        content: "content",
      },
    });
    // client.api.
  };
  return <button onClick={sampleOnClick}>追加</button>;
};
