"use client";

import { useUpdateNote } from "@/hooks/useUpdateNote";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

export const useUpdateNoteDebounced = () => {
  const { updateNote } = useUpdateNote();

  const updateNoteDebounced = useMemo(() => {
    return debounce(updateNote, 1000, {
      maxWait: 2000,
    });
  }, [updateNote]);

  useEffect(() => {
    return () => {
      if (updateNoteDebounced.flush) {
        updateNoteDebounced.flush();
      }
      updateNoteDebounced.cancel();
    };
  }, [updateNoteDebounced]);

  return { updateNoteDebounced };
};
