"use client";

import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { serachResultCountAtom, xsMediaMatchedAtom } from "@/shared/atoms";
import { MdSearch } from "react-icons/md";
import { useRecoilValue } from "recoil";
import SearchInput from "./SearchInput";
import SearchResult from "../SearchResult/SearchResult";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  focused: boolean;
  isEmbedded: boolean;
}

function VisualFunctionKey({ focused }: { focused: boolean }) {
  const { isXS, loading: mediaLoading } = useRecoilValue(xsMediaMatchedAtom);
  const isFunctionKeyUsable = !mediaLoading && !isXS;

  if (!isFunctionKeyUsable) return null;

  return (
    <div className="flex-center px-2 rounded-md min-w-7 h-7 bg-[#525255] border-b-2 border-[#363638]">
      <span className="leading-10 text-xs font-extrabold text-[#bdbdc4]">
        {focused ? "ESC" : "/"}
      </span>
    </div>
  );
}

export default function SearchBar({ focused, isEmbedded }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [itemIdx, setItemIdx] = useState(0);
  const searchResultCount = useRecoilValue(serachResultCountAtom);
  const embeddedIdle = isEmbedded && !focused;

  const { value: debouncedText, isDebouncing } = useDebounce(text, 200);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // 한글 고유의 조합문자가 입력되었을 때는 무시한다.
    if (e.nativeEvent.isComposing) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setItemIdx((prev) => {
        return Math.min(prev + 1, searchResultCount - 1);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setItemIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (e.repeat) return;
      e.preventDefault();

      const focusedItemId = document
        .querySelector(".key-focused")
        ?.getAttribute("data-item-id");

      if (focusedItemId) {
        router.push(`/prices/${focusedItemId}`);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setItemIdx(0);
  };

  useEffect(() => {
    if (!focused) {
      setText("");
    }
  }, [focused]);

  return (
    <>
      {/* Search Bar */}
      <div
        className={`
          relative
          flex-center
          w-full
          rounded-[28px]
          bg-[#202022]
          border-[#303032]
          ${embeddedIdle ? "p-4 xs:py-2" : "px-5"}
          ${embeddedIdle ? "border-0 xs:border-2" : "border-2"}
          ${embeddedIdle ? "cursor-pointer" : ""}
          ${focused ? "border-[#303032] border-b-0" : "border-[#626265]"}
          ${focused ? "bg-[#202022]" : ""} 
          ${focused ? "rounded-b-none" : ""}
          ${focused ? "" : "hover:bg-[#303032]"}
          hover:border-[#303032] 
      `}
      >
        <IconWrapper
          className={`text-[#828288] ${
            embeddedIdle ? "text-2xl mr-0 xs:mr-3" : "text-xl"
          }`}
        >
          <MdSearch />
        </IconWrapper>
        {isEmbedded ? null : (
          <SearchInput
            focused={focused}
            text={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )}
        <VisualFunctionKey focused={focused} />
      </div>
      <SearchResult
        focused={focused}
        searchText={debouncedText}
        itemIdx={itemIdx}
        isDebouncing={isDebouncing}
      />
    </>
  );
}
