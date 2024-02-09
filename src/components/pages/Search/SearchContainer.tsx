"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { xsMediaMatchedAtom } from "@/shared/atoms";
import SearchBar from "./SearchBar/SearchBar";
import FixedSearchContainer from "./FixedSearchContainer";

export default function SearchContainer({
  embedded = false,
  onFocusChange = () => {},
}: {
  embedded?: boolean;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [focused, setFocused] = useState(false);
  const { isXS, loading: mediaLoading } = useRecoilValue(xsMediaMatchedAtom);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (e.target === null) return;
      if (e.target instanceof Element === false) return;

      e.stopPropagation();

      if (e.target.closest(".search-container")) {
        setFocused(true);
        return;
      }

      setFocused(false);
    };

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "/") {
        e.preventDefault();
        setFocused(true);
      }
    };

    const keyupHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setFocused(false);
      }
    };

    window.addEventListener("click", clickHandler);
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
      setFocused(false);
    };
  }, [setFocused]);

  useEffect(() => {
    onFocusChange(focused);
  }, [onFocusChange, focused]);

  if (embedded && mediaLoading) return null;

  if (focused) {
    if (isXS || embedded) {
      return <FixedSearchContainer focused={focused} />;
    }
  }

  return (
    <div
      className={`search-container relative w-full max-w-[600px] ${
        embedded ? "w-auto" : "mb-4 xs:mb-8"
      }`}
    >
      <SearchBar focused={focused} isEmbedded={embedded} />
    </div>
  );
}
