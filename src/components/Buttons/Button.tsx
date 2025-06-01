import { FC, MouseEventHandler } from "react";
import { Button as MuiButton, Typography } from "@mui/material";

type ButtonProps = {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  isLoading,
  title,
  startIcon,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      loading={isLoading}
      variant="outlined"
      sx={{
        backgroundColor: "white", // 好きな色
      }}
      startIcon={startIcon}
    >
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
    </MuiButton>
  );
};
