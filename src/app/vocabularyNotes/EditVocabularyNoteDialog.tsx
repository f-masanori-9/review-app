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
import { useTags } from "@/hooks/tag/useTags";
import { useNoteToTagRelations } from "@/hooks/noteToTagRelation/useNoteToTagRelations";
import { useEditNoteToTagRelations } from "@/hooks/noteToTagRelation/useEditNoteToTagRelations";
import { CreatableAutoComplete } from "@/components/CreatableAutoComplete";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
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
  const { data: tags = [] } = useTags();
  const {
    data: noteToTagsRelations = [],
    isLoading: isLoadingNoteToTagRelations,
  } = useNoteToTagRelations({
    noteId: vocabularyNote.id,
  });
  const { editNoteToTagRelations } = useEditNoteToTagRelations();
  const isOpen = !!vocabularyNote;

  const { createTagWithId } = useCreateTag();
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
            <div className="h-10">
              {isLoadingNoteToTagRelations ? (
                <Loading />
              ) : (
                <CreatableAutoComplete
                  onCreateItem={(item) => {
                    createTagWithId({ tagId: item.value, tagName: item.label });
                  }}
                  defaultValueIds={noteToTagsRelations.map((r) => r.tagId)}
                  onChange={(e) => {
                    console.log(e);
                    editNoteToTagRelations({
                      noteId: vocabularyNote.id,
                      tagIds: e.map((v) => v.value),
                    });
                  }}
                  options={[
                    ...tags.map((tag) => {
                      return {
                        value: tag.id,
                        label: tag.name,
                      };
                    }),
                  ]}
                  placeholder="タグを選択"
                />
              )}
            </div>
            <Description>
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded p-1"
                value={content.frontContent}
                onChange={(e) => {
                  setContent({
                    ...content,
                    frontContent: e.target.value,
                  });
                  updateVocabularyNoteDebounced({
                    noteId: vocabularyNote.id,
                    kind: "frontContent",
                    content: vocabularyNote.frontContent,
                  });
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
                  updateVocabularyNoteDebounced({
                    noteId: vocabularyNote.id,
                    kind: "backContent",
                    content: vocabularyNote.backContent,
                  });
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
