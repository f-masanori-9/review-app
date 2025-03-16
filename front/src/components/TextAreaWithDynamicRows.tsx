import React, { FC, useEffect, useRef, useState } from "react";

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

  // NOTE: -1 は、復習や削除ボタンの分
  return Math.floor((textareaHeight - paddingY - 1) / lineHeight);
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

  const [isFocusing, setIsForcusing] = useState(false);

  return (
    <textarea
      ref={textareaRef}
      rows={rows + 1}
      onInput={handleInput}
      className={className}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onFocus={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onFocus && onFocus();
        setIsForcusing(true);
      }}
      onBlur={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onBlur && onBlur();
        setIsForcusing(false);
      }}
    />
  );
};
