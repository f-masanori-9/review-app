"use client";

import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { useUpdateVocabularyNote } from "./useUpdateVocabularyNote";

export const useUpdateVocabularyNoteDebounced = () => {
  const { updateNote } = useUpdateVocabularyNote();

  const updateVocabularyNoteDebounced = useMemo(() => {
    return debounce(updateNote, 1000, {
      maxWait: 2000,
    });
  }, [updateNote]);

  useEffect(() => {
    return () => {
      if (updateVocabularyNoteDebounced.flush) {
        updateVocabularyNoteDebounced.flush();
      }
      updateVocabularyNoteDebounced.cancel();
    };
  }, [updateVocabularyNoteDebounced]);

  return { updateVocabularyNoteDebounced };
};
