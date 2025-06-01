import { ReviewButton } from "@/components/Buttons/ReviewButton";

export const Header: React.FC<{
  onClickReviewButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  allCardsCount: number;
  cardOrder: number;
  reviewCount: number;
}> = ({ onClickReviewButton, allCardsCount, cardOrder, reviewCount }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-gray-500">
        <ReviewButton onClick={onClickReviewButton} reviewCount={reviewCount} />
      </div>
      <div className="text-gray-500 text-lg">
        {cardOrder} / {allCardsCount}
      </div>
    </div>
  );
};
