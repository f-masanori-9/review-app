"use client";

import { Loading } from "@/components/Loading";
import React, { FC, Fragment, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { AddVocabularyNote } from "@/components/Buttons/AddVocabularyNote";
import { useAddVocabularyNote } from "@/hooks/useAddVocabularyNote";
import { OneVocabularyNote } from "./OneVocabularyNote";
import { generateSeedFromDatetime, shuffleArray } from "@/libs/shuffleArray";

import { StartPlayVocabularyNote } from "@/components/Buttons/StartPlayVocabularyNote";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";
import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();
  const { addVocabularyNote } = useAddVocabularyNote();
  const startPlayVocabularyNote = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      router.push(`/vocabularyNotes/play`);
    },
    [router]
  );

  const [selectedVN, setSelectedVN] = useState<{
    id: string;
    frontContent: string;
    backContent: string;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
      {shuffleArray(vocabularyNotes, generateSeedFromDatetime()).map((n) => {
        return (
          <div
            key={n.id}
            onClick={() => {
              setSelectedVN({
                id: n.id,
                frontContent: n.frontContent,
                backContent: n.backContent,
              });
            }}
          >
            <OneVocabularyNote note={n} reviewCount={n.reviewLogs.length} />
          </div>
        );
      })}
      <div className="fixed z-50 bottom-24 left-2  cursor-pointer">
        <AddVocabularyNote onClick={addVocabularyNote} />
      </div>
      <div className="fixed z-50 bottom-24 right-2  cursor-pointer">
        <StartPlayVocabularyNote onClick={startPlayVocabularyNote} />
      </div>
      {selectedVN && (
        <EditVocabularyNoteDialog
          vocabularyNote={selectedVN}
          onClose={() => {
            setSelectedVN(null);
          }}
        />
      )}
    </div>
  );
}

const EditVocabularyNoteDialog: FC<{
  vocabularyNote: {
    id: string;
    frontContent: string;
    backContent: string;
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
                placeholder="Front content"
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
                placeholder="Back content"
              />
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
