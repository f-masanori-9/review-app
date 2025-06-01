import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { IconButton } from "@mui/material";
import { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export const Footer: FC<{
  reviewCount: number;
  isReviewed: boolean;
  isLoadingMutate: boolean;
  onClickReview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  noteId: string;
  onClickMenuButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClickReview, reviewCount, isReviewed, isLoadingMutate,
    onClickMenuButton
 }) => {
  return (
    <div className="flex justify-between h-8">
      <div className="flex items-center gap-2 text-gray-500">
        <ReviewButton
          onClick={onClickReview}
          //   onClick={async (e) => {
          //     e.stopPropagation();
          //     await addVocabularyNoteReview(note.id);
          //     setIsReviewed(true);
          //     reward();
          //     mutate();
          //   }}
          reviewCount={reviewCount}
          isReviewed={isReviewed}
          isLoading={isLoadingMutate}
        />
      </div>
      <IconButton
        aria-label="more"
        id="long-button"
        // aria-controls={open ? "long-menu" : undefined}
        // aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={onClickMenuButton}
      >
        <MoreVertIcon />
      </IconButton>
      {/* <DropDownMenu
        menuButtonChildren={<BsThreeDotsVertical size={18} />}
        items={[
          {
            key: "delete",
            children: (
              <div className="flex items-center gap-1">
                <FaTrash />
                <span>削除</span>
              </div>
            ),
            onClick: () => {
              if (confirm("削除しますか？")) {
                deleteVocabularyNote(note.id);
              }
            },
          },
        ]}
      /> */}
    </div>
  );
};
