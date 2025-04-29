"use client";

import { Loading } from "@/components/Loading";
import React, { FC, Fragment, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddVocabularyNote } from "@/hooks/useAddVocabularyNote";
import { OneVocabularyNote } from "./OneVocabularyNote";

import { StartPlayVocabularyNote } from "@/components/Buttons/StartPlayVocabularyNote";

import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { EditVocabularyNoteDialogCore } from "./EditVocabularyNoteDialog";
import { Button } from "@/components/Buttons/Button";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Textarea,
  Transition,
} from "@headlessui/react";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useMutateTags, useTags } from "@/hooks/tag/useTags";
import { CreatableAutoComplete } from "@/components/CreatableAutoComplete";
import { intersection } from "lodash";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();
  const { addVocabularyNote, isLoading: isLoadingAdding } =
    useAddVocabularyNote();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const onClickStartPlayVocabularyNote = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setIsProcessing(true);
      const queryParams = new URLSearchParams();
      selectedTagIds.forEach((id) => queryParams.append("tagIds", id));
      router.push(`/vocabularyNotes/play?${queryParams.toString()}`);
    },
    [router, selectedTagIds]
  );
  const { data: tags = [] } = useTags();

  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const [selectedVN, setSelectedVN] = useState<{
    id: string;
  } | null>(null);
  const { createTagWithId } = useCreateTag();
  const { mutateTags } = useMutateTags();

  const filteredNotes = useMemo(() => {
    return vocabularyNotes.filter((note) => {
      if (!selectedTagIds.length) return true;
      const noteTagsIds = note.noteToTagRelations.map((d) => d.tagId);
      return intersection(selectedTagIds, noteTagsIds).length > 0;
    });
  }, [selectedTagIds, vocabularyNotes]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
      <CreatableAutoComplete
        options={[
          ...tags.map((tag) => {
            return {
              value: tag.id,
              label: tag.name,
            };
          }),
        ]}
        onChange={(selected) => {
          setSelectedTagIds(selected.map((s) => s.value));
        }}
        placeholder="タグを選択"
        onCreateItem={async (option) => {
          createTagWithId({
            tagId: option.value,
            tagName: option.label,
          }).then(() => {
            mutateTags();
          });
        }}
      />
      {/* TODO: いつかシャッフル */}
      {/* {shuffleArray(filteredNotes, generateSeedFromDatetime()).map((n) => { */}
      {filteredNotes.map((n) => {
        return (
          <div key={n.id}>
            <OneVocabularyNote
              note={n}
              tags={n.noteToTagRelations}
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
