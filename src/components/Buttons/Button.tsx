import { FC } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: FC<ButtonProps> = ({
  variant = "filled",
  size = "medium",
  onClick,
  children,
}) => {
  const baseStyles = "rounded font-medium focus:outline-none ";
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

  const classes = clsx(baseStyles, variantStyles[variant], sizeStyles[size]);

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
