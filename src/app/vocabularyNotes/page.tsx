"use client";

import { Loading } from "@/components/Loading";
import React, { FC, Fragment, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddVocabularyNote } from "@/hooks/useAddVocabularyNote";
import { OneVocabularyNote } from "./OneVocabularyNote";
import { generateSeedFromDatetime, shuffleArray } from "@/libs/shuffleArray";

import { StartPlayVocabularyNote } from "@/components/Buttons/StartPlayVocabularyNote";

import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { EditVocabularyNoteDialogCore } from "./EditVocabularyNoteDialog";
import { Button } from "@/components/Buttons/Button";
import { AutoComplete } from "@/components/AutoComplete";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Textarea,
  Transition,
} from "@headlessui/react";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useTags } from "@/hooks/tag/useTags";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();
  const { addVocabularyNote, isLoading: isLoadingAdding } =
    useAddVocabularyNote();
  const [isProcessing, setIsProcessing] = useState(false);
  const onClickStartPlayVocabularyNote = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setIsProcessing(true);
      router.push(`/vocabularyNotes/play`);
    },
    [router]
  );
  const { data: tags = [] } = useTags();

  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const [selectedVN, setSelectedVN] = useState<{
    id: string;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
      <AutoComplete
        options={[
          {
            value: "all",
            label: "全てのタグ",
            isFixed: true,
          },
          ...tags.map((tag) => {
            return {
              value: tag.id,
              label: tag.name,
            };
          }),
          {
            value: "yellow",
            label: "Yellow",
            createButton: {
              onClick: () => {
                setIsOpenAddTagDialog(true);
              },
              label: "タグを追加",
            },
          },
        ]}
      />
      {shuffleArray(vocabularyNotes, generateSeedFromDatetime()).map((n) => {
        return (
          <div key={n.id}>
            <OneVocabularyNote
              note={n}
              reviewCount={n.reviewLogs.length}
              onClickVN={({ vnId }) => {
                setSelectedVN({
                  id: vnId,
                });
              }}
            />
          </div>
        );
      })}
      <div className="fixed z-50 bottom-24 left-2  cursor-pointer">
        <Button
          variant="outlined"
          onClick={addVocabularyNote}
          title="単語帳を追加"
          isLoading={isLoadingAdding}
        ></Button>
      </div>
      <div className="fixed z-50 bottom-24 right-2  cursor-pointer">
        <StartPlayVocabularyNote
          isLoading={isProcessing}
          onClick={onClickStartPlayVocabularyNote}
        />
      </div>
      {selectedVN && (
        <EditVocabularyNoteDialogCore
          vocabularyNoteId={selectedVN.id}
          onClose={() => {
            setSelectedVN(null);
          }}
        />
      )}
      <AddTagDialog
        onClose={(tagName) => {
          setIsOpenAddTagDialog(false);
          if (!tagName) return;
          createTag({ tagName });
        }}
        isOpen={isOpenAddTagDialog}
      />
    </div>
  );
}

const AddTagDialog: FC<{
  isOpen: boolean;
  onClose: (inputName: string) => void;
}> = ({ isOpen, onClose }) => {
  // TODO: react-hook-formを使う
  const [content, setContent] = useState("");

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
      <Dialog
        open={isOpen}
        onClose={() => {
          onClose(content);
          setContent("");
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-screen max-w-sm rounded bg-white  p-2">
            <DialogTitle>タグ追加</DialogTitle>
            <Description className={"p-2"}>
              <Textarea
                className="w-full p-2 border-gray-300 rounded"
                autoFocus
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder="タグ名"
              />
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
