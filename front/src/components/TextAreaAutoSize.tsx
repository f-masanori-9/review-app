"use client";

import { ChangeEventHandler, FC, useState } from "react";
import React from "react";

export const TextAreaAutoSize: FC<{
  defaultValue: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}> = ({ defaultValue, onChange, placeholder }) => {
  const [value, setValue] = useState(defaultValue);
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      className="w-full h-auto p-3 m-1 border-none focus:ring-0 focus:outline-none min-h-32"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
      placeholder={placeholder}
    />
  );
};
