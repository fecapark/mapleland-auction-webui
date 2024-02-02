import { useQuery } from "@tanstack/react-query";
import * as Hangul from "hangul-js";
import { useEffect, useMemo, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { serachResultCountAtom } from "@/shared/atoms";
import SearchItem from "./SearchItem";
import { ItemData, getItemList } from "@/server/actions";
import Loader from "@/components/utils/Loader/Loader";

function searchDatas(datas: ItemData[], text: string): ItemData[] {
  function search(target: string, text: string) {
    // 1. 검색 대상이 검색어를 포함하고 있는가?
    if (target.includes(text)) return true;
    // 2. 공백을 제거했을때 검색 대상이 검색어를 포함하고 있는가?
    if (target.replaceAll(" ", "").includes(text.replaceAll(" ", "")))
      return true;
    // 3. 한글의 자음 모음을 분리했을 때 검색 대상이 검색어를 포함하고 있는가?
    if (
      Hangul.disassemble(target)
        .filter((char) => char !== " ")
        .join("")
        .includes(
          Hangul.disassemble(text)
            .filter((char) => char !== " ")
            .join("")
        )
    )
      return true;

    return false;
  }

  text = text.trim();

  if (text === "") return [];
  return datas.filter(({ keywords, name }) => {
    if (keywords.some((keyword) => search(keyword, text))) return true;
    if (search(name, text)) return true;
    return false;
  });
}

export default function SearchResult({
  focused,
  searchText,
  itemIdx,
  isDebouncing = false,
}: {
  focused: boolean;
  searchText: string;
  itemIdx: number;
  isDebouncing?: boolean;
}) {
  const setSearchResultCount = useSetRecoilState(serachResultCountAtom);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: ["item-list"],
    queryFn: getItemList,
    placeholderData: [],
  });

  const searchResult = useMemo(() => {
    if (!data) return [];
    return searchDatas(data, searchText);
  }, [data, searchText]);

  const itemLists = useMemo(() => {
    return searchResult.map(({ id, name }, i) => {
      return (
        <SearchItem key={i} id={id} name={name} keyFocused={itemIdx === i} />
      );
    });
  }, [searchResult, itemIdx]);

  useEffect(() => {
    scrollRef.current?.querySelector(".key-focused")?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
    });
  }, [itemIdx]);

  useEffect(() => {
    setSearchResultCount(searchResult.length);
  }, [searchResult.length, setSearchResultCount]);

  if (!focused) return null;

  return (
    <div
      ref={scrollRef}
      className={`
        absolute 
        w-full
        max-h-[300px] 
        xs:max-h-[500px]
        top-[100%] 
        pr-5 
        z-100
        bg-[#202022] 
        rounded-b-[28px] 
        border-2
        border-t-0
        border-[#303032] 
        overflow-auto 
        scrollbar-thin
        scrollbar-thumb-rounded
        scrollbar-thumb-[#626265]
        scrollbar-track-transparent
        ${itemLists.length === 0 ? "pl-5" : ""}
        ${focused ? "shadow-[0px_24px_48px_rgba(0,0,0,0.6)]" : ""}
      `}
    >
      <div className="flex flex-col gap-2 border-t-[1px] border-[#626264] py-4">
        {isDebouncing && searchText === "" ? (
          <Loader />
        ) : itemLists.length === 0 ? (
          <div className="flex-center flex-col gap-1 text-[#828288] py-2">
            <div>
              {searchText === ""
                ? "아이템 이름을 검색해보세요."
                : "검색 결과가 없습니다."}
            </div>
            <div className="text-xs">
              현재는 소비, 기타 아이템 검색만 지원하고 있어요.
            </div>
          </div>
        ) : (
          itemLists
        )}
      </div>
    </div>
  );
}
