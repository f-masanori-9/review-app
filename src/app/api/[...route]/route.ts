import { Hono } from "hono";
import { handle } from "hono/vercel";

import { HTTPException } from "hono/http-exception";
import { requestedUserMiddleware } from "./requestedUserMiddleware";
import { postVocabularyNoteHandler } from "./vocabulary-notes/postVocabularyNoteHandler";
import { getVocabularyNoteHandler } from "./vocabulary-notes/getVocabularyNoteHandler";
import { patchVocabularyNoteHandler } from "./vocabulary-notes/patchVocabularyNoteHandler";
import { deleteVocabularyNoteHandler } from "./vocabulary-notes/deleteVocabularyNoteHandler";
import { postVocabularyNoteReviewLogHandler } from "./vocabulary-notes/logs/postVocabularyNoteReviewLogHandler";
import { getOneVocabularyNoteHandler } from "./vocabulary-notes/getOneVocabularyNoteHandler";

const app = new Hono()
  .basePath("/api")
  .use(requestedUserMiddleware)
  .post("/vocabulary-notes", ...postVocabularyNoteHandler)
  .get("/vocabulary-notes", ...getVocabularyNoteHandler)
  .get("/vocabulary-notes/:id", ...getOneVocabularyNoteHandler)
  .patch("/vocabulary-notes/:id", ...patchVocabularyNoteHandler)
  .delete("/vocabulary-notes", ...deleteVocabularyNoteHandler)
  .post("/vocabulary-notes/review-logs", ...postVocabularyNoteReviewLogHandler)

  .onError((err, c) => {
    // TODO: エラーハンドリングを実装
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    console.error(err);
    return c.newResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      500,
      {
        "Content-Type": "application/json",
      }
    );
  });

export type EndPointType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
