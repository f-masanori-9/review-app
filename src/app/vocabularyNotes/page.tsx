"use client";

import { Loading } from "@/components/Loading";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAddVocabularyNote } from "@/hooks/useAddVocabularyNote";
import { OneVocabularyNote } from "./OneVocabularyNote";
import { generateSeedFromDatetime, shuffleArray } from "@/libs/shuffleArray";

import { StartPlayVocabularyNote } from "@/components/Buttons/StartPlayVocabularyNote";

import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { EditVocabularyNoteDialogCore } from "./EditVocabularyNoteDialog";
import { Button } from "@/components/Buttons/Button";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();
  const { addVocabularyNote, isLoading: isLoadingAdding } =
    useAddVocabularyNote();
  const onClickStartPlayVocabularyNote = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      router.push(`/vocabularyNotes/play`);
    },
    [router]
  );

  const [selectedVN, setSelectedVN] = useState<{
    id: string;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
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
        <StartPlayVocabularyNote onClick={onClickStartPlayVocabularyNote} />
      </div>
      {selectedVN && (
        <EditVocabularyNoteDialogCore
          vocabularyNoteId={selectedVN.id}
          onClose={() => {
            setSelectedVN(null);
          }}
        />
      )}
    </div>
  );
}
