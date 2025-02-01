import { FC, useEffect, useRef, useState } from "react";

const heightToNumber = (str: string): number => {
  return +str.replace("px", "");
};

const calculateRows = (textarea: HTMLTextAreaElement | null): number => {
  if (!textarea) return 0;

  const style = getComputedStyle(textarea);
  const lineHeight = heightToNumber(style.lineHeight);
  const paddingY =
    heightToNumber(style.paddingTop) + heightToNumber(style.paddingBottom);
  const textareaHeight = textarea.scrollHeight;

  return Math.floor((textareaHeight - paddingY) / lineHeight);
};

export const TextAreaWithDynamicRows: FC<{
  defaultValue: string;
  onChange: (value: string) => void;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({ defaultValue, onChange, className, onFocus, onBlur }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    setRows(calculateRows(textareaRef.current));
  }, []);

  const handleInput = (): void => {
    setRows(calculateRows(textareaRef.current));
  };

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      onInput={handleInput}
      className={className}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
