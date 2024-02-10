"use client";

import LandingLogo from "./LandingLogo/LandingLogo";
import SearchContainer from "../Search/SearchContainer";
import TrendingContainer from "./Trending/TrendingContainer";
import { useState } from "react";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { HiSpeakerphone } from "react-icons/hi";
import Link from "next/link";

function NoticeContainer({ hidden }: { hidden: boolean }) {
  if (hidden) return null;

  return (
    <div className="mb-4 xs:mb-8 w-full flex-center">
      <div className="card-border card-bg w-full max-w-[300px] pr-4 pl-4 py-2">
        <div className="flex items-center">
          <IconWrapper className="text-[#B31306] mr-2 text-lg">
            <HiSpeakerphone />
          </IconWrapper>
          <Link href="/updates/6" className="overflow-hidden">
            <div className="w-full text-ellipsis text-[#d2d2d5]">
              <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden hover:underline cursor-pointer">
                [2/11 업데이트] 주문서 및 디스코드 아이템 시세 관련 기능
                업데이트 및 개선 안내
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingContainer() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div
      className={
        searchFocused
          ? "w-full flex justify-center items-start"
          : "w-full flex-center mt-[15vh]"
      }
    >
      <div className={`w-full px-4 ${searchFocused ? "pt-4 xs:pt-0" : ""}`}>
        <div className="flex-center flex-col w-full">
          <LandingLogo hiddenWhenXS={searchFocused} />
          <SearchContainer onFocusChange={(focus) => setSearchFocused(focus)} />
          <NoticeContainer hidden={searchFocused} />
          <TrendingContainer hidden={searchFocused} />
        </div>
      </div>
    </div>
  );
}
