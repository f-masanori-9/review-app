import { FC } from "react";
import clsx from "clsx";
import { Loading } from "../Loading";

type ButtonProps = {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  variant = "filled",
  size = "medium",
  onClick,
  isLoading,
  title,
  isDisabled,
  className,
}) => {
  const isFullWidth = size === "large" || size === "medium";
  const baseStyles = "rounded font-medium focus:outline-none bg-white";
  const variantStyles = {
    filled: "border-primary text-primary  ",
    outlined:
      "border border-primary  text-blue-500 hover:bg-blue-100 focus:ring-blue-300",
  };
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  const fullWidthStyles = isFullWidth ? "w-full" : "w-auto";

  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidthStyles,
    className
  );

  return (
    <button className={classes} onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-grow-0">
          <span className="text-primary text-md font-bold">{title}</span>
        </div>
      )}
    </button>
  );
};
