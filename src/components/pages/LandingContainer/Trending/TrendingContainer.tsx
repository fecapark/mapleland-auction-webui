"use client";

import { getItemList, getTrendingData } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import TrendingItem from "./TrendingItem";
import { MdInfoOutline, MdTrendingUp } from "react-icons/md";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { useEffect, useMemo } from "react";
import useModal from "@/hooks/useModal";
import SimpleTrendingInfo from "@/components/modals/contents/SimpleTrendingInfo";
import Link from "next/link";

export default function TrendingContainer({ hidden }: { hidden?: boolean }) {
  const setModal = useModal({
    title: "트렌딩 아이템",
    content: <SimpleTrendingInfo />,
  });

  const { data: itemListData } = useQuery({
    queryKey: ["item-list"],
    queryFn: getItemList,
    placeholderData: [],
  });

  const { data: trendingData, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingData,
    placeholderData: undefined,
    staleTime: 1000 * 60 * 60 * 2, // 2시간 동안은 데이터 신뢰 보장
  });

  const randomTrendingType = useMemo(() => {
    if (!trendingData) return null;
    if (Math.random() < 0.5) return "price";
    return "volume";
  }, [trendingData]);

  const getItemName = (itemId: number) => {
    if (!itemListData) return "";
    return itemListData.find(({ id }) => `${id}` === `${itemId}`)?.name ?? "";
  };

  useEffect(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);

  return (
    <div className={`relative w-full h-[200px] ${hidden ? "hidden" : ""}`}>
      <div className="absolute -translate-x-1/2 top-0 left-1/2 w-full flex-center">
        <div className="flex flex-col gap-2 card-border pt-1 pb-4 bg-[#1F1F22]">
          <div
            className={`flex justify-between items-center pr-1 text-[#d2d2d4] ${
              !randomTrendingType ? "invisible" : "visible"
            }`}
          >
            <div className="flex-center pl-4">
              <IconWrapper className="text-xl mr-2">
                <MdTrendingUp />
              </IconWrapper>
              <span className="text-sm">
                현재 이 아이템들이{" "}
                {randomTrendingType === "price" ? "비싸요" : "인기있어요"}
              </span>
              <span className="mx-1 xs:mx-2 text-white">·</span>
              <Link href="/trending">
                <span className="text-sm text-[#2D7CEB] hover:underline cursor-pointer">
                  더 보기
                </span>
              </Link>
            </div>
            <div
              className="w-10 h-10 flex-center cursor-pointer hover:bg-[#2a2a2c] rounded-[50%]"
              onClick={() => setModal(true)}
            >
              <IconWrapper className="text-xl text-[#b2b2b4]">
                <MdInfoOutline />
              </IconWrapper>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:flex gap-4 pl-7 pr-4">
            {isLoading || !randomTrendingType ? (
              <>
                <div className="w-[130px] h-[37px]"></div>
                <div className="w-[130px] h-[37px]"></div>
                <div className="w-[130px] h-[37px]"></div>
                <div className="w-[130px] h-[37px]"></div>
              </>
            ) : (
              (randomTrendingType === "price"
                ? trendingData!.cost
                : trendingData!.total_results
              )
                .slice(0, 4)
                .map(({ id, value }, i) => (
                  <TrendingItem
                    key={id}
                    id={`${id}`}
                    value={value}
                    rank={i + 1}
                    type={randomTrendingType}
                    name={getItemName(id)}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
