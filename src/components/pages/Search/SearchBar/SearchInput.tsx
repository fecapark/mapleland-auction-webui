"use client";

import { useEffect, useRef } from "react";

interface Props {
  focused: boolean;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function SearchInput({
  focused,
  text,
  onChange,
  onKeyDown,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    if (focused) inputRef.current.focus();
    else inputRef.current.blur();
  }, [focused]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="뇌전 수리검을 검색해보세요."
      className="bg-transparent w-full px-4 py-[14px]"
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        e.preventDefault();
      }}
    />
  );
}
