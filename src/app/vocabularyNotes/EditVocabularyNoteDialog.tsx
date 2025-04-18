"use client";

import { Loading } from "@/components/Loading";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";
import { generateApiClient } from "@/libs/apiClient";
const client = generateApiClient();

export const EditVocabularyNoteDialogCore: FC<{
  vocabularyNoteId: string;
  onClose: () => void;
}> = ({ onClose, vocabularyNoteId }) => {
  const isFirstFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularyNote, setVocabularyNote] = useState<{
    readonly id: string;
    readonly userId: string;
    readonly frontContent: string;
    readonly backContent: string;
    readonly createdAt: string;
    readonly updatedAt: string;
  } | null>(null);

  useEffect(() => {
    if (isFirstFetched.current) return;
    setIsLoading(true);
    isFirstFetched.current = true;
    client.api["vocabulary-notes"][":id"]
      .$get({
        param: { id: vocabularyNoteId },
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        setVocabularyNote(data.vocabularyNote);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [vocabularyNoteId]);

  if (isLoading || !vocabularyNote) return <Loading />;

  return (
    <EditVocabularyNoteDialog
      vocabularyNote={vocabularyNote}
      onClose={onClose}
    />
  );
};

const EditVocabularyNoteDialog: FC<{
  vocabularyNote: {
    readonly id: string;
    readonly userId: string;
    readonly frontContent: string;
    readonly backContent: string;
    readonly createdAt: string;
    readonly updatedAt: string;
  };
  onClose: () => void;
}> = ({ vocabularyNote, onClose }) => {
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced();

  const isOpen = !!vocabularyNote;

  const [content, setContent] = useState({
    frontContent: vocabularyNote?.frontContent || "",
    backContent: vocabularyNote?.backContent || "",
  });

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform translate-y-4 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-in"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform translate-y-4 opacity-0"
    >
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-screen max-w-sm rounded bg-white  p-2">
            <DialogTitle>単語帳編集</DialogTitle>
            <Description>
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded p-1"
                value={content.frontContent}
                onChange={(e) => {
                  setContent({
                    ...content,
                    frontContent: e.target.value,
                  });
                  updateVocabularyNoteDebounced(
                    vocabularyNote.id,
                    e.target.value,
                    vocabularyNote.backContent
                  );
                }}
                placeholder="表面"
              />
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded"
                value={content.backContent}
                onChange={(e) => {
                  setContent({
                    ...content,
                    backContent: e.target.value,
                  });
                  updateVocabularyNoteDebounced(
                    vocabularyNote.id,
                    vocabularyNote.frontContent,
                    e.target.value
                  );
                }}
                placeholder="裏面"
              />
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
