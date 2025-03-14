"use client";

import { Loading } from "@/components/Loading";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddNote } from "@/hooks/useAddNote";
import { AddVocabularyNote } from "@/components/Buttons/AddVocabularyNote";
import { useAddVocabularyNote } from "@/hooks/useAddVocabularyNote";
import { OneVocabularyNote } from "./OneVocabularyNote";
import { generateSeedFromDatetime, shuffleArray } from "@/libs/shuffleArray";
import { useVocabularyNotes } from "@/hooks/useVocabularyNotes";
export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();
  const { addNote } = useAddNote();
  const { addVocabularyNote } = useAddVocabularyNote();

  const [isLoadingNotes, setIsLoadingNote] = useState(false);

  if (isLoading || isLoadingNotes) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
      {shuffleArray(vocabularyNotes, generateSeedFromDatetime()).map((n) => {
        return (
          <div key={n.id}>
            <OneVocabularyNote note={n} reviewCount={n.reviewCount} />
          </div>
        );
      })}
      <div className="fixed z-50 bottom-24 left-2  cursor-pointer">
        <AddVocabularyNote onClick={addVocabularyNote} />
      </div>
    </div>
  );
}

const getReviewOpacity = (count: number): number => {
  const maxReviews = 30;
  const maxOpacity = 100;
  return Math.min(
    Math.floor(((count / maxReviews) * maxOpacity) / 5) * 5,
    maxOpacity
  );
};

const bgColorClass = [
  `bg-blue-300/0`,
  `bg-blue-300/5`,
  `bg-blue-300/10`,
  `bg-blue-300/15`,
  `bg-blue-300/20`,
  `bg-blue-300/25`,
  `bg-blue-300/30`,
  `bg-blue-300/35`,
  `bg-blue-300/40`,
  `bg-blue-300/45`,
  `bg-blue-300/50`,
  `bg-blue-300/55`,
  `bg-blue-300/60`,
  `bg-blue-300/65`,
  `bg-blue-300/70`,
  `bg-blue-300/75`,
  `bg-blue-300/80`,
  `bg-blue-300/85`,
  `bg-blue-300/90`,
  `bg-blue-300/95`,
  `bg-blue-300/100`,
] as const;
