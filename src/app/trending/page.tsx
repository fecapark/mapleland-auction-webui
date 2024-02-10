"use client";

import ImbedHeader from "@/components/pages/ImbedHeader/ImbedHeader";
import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import Loader from "@/components/utils/Loader/Loader";
import {
  TrendingItemData,
  getItemImageSource,
  getItemList,
  getTrendingData,
  getTrendingGGData,
} from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaMinus } from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";
import { MdWarning } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chartTickValueAtom,
  platformPriceNavigatorSectionAtom,
} from "@/shared/atoms";

function TrendingSectionItem({
  id,
  name,
  rank,
  rankDiff,
  value,
  valueDiff,
  type,
  warn,
}: {
  id: number;
  name: string;
  value: number;
  valueDiff: number | null;
  type: "price" | "volume";
  rank: number;
  rankDiff: number | null;
  warn: boolean;
}) {
  const getRankColor = (force: number | undefined = undefined) => {
    rank = force ?? rank;

    if (rank === 1) return "#ffbb00";
    if (rank === 2) return "#a0a0a0";
    if (rank === 3) return "#cd7f32";
    if (rank === 4) return "#4C3E41";
    return "#763525";
  };

  const RankDiff = () => {
    if (rankDiff === 0)
      return (
        <div className="text-[#a0a0a0] flex-center">
          <IconWrapper>
            <FaMinus />
          </IconWrapper>
        </div>
      );

    if (rankDiff === null) {
      return (
        <div className="bg-[#183B3F] w-6 h-4 rounded-sm flex-center">
          <span className="leading-[0] font-semibold text-xs text-positive">
            N
          </span>
        </div>
      );
    }

    if (rankDiff > 0) {
      return (
        <div className="flex-center text-positive">
          <IconWrapper className="text-xs mr-[4px]">
            <IoTriangleSharp />
          </IconWrapper>
          <span className="leading-[0] text-sm font-semibold">{rankDiff}</span>
        </div>
      );
    }

    return (
      <div className="flex-center text-negative">
        <IconWrapper className="text-xs mr-[4px] rotate-180">
          <IoTriangleSharp />
        </IconWrapper>
        <span className="leading-[0] text-sm font-semibold">
          {Math.abs(rankDiff)}
        </span>
      </div>
    );
  };

  return (
    <Link href={`prices/${id}`}>
      <div
        className="card-border card-bg relative flex items-center px-4 py-3 hover:bg-[#38383a] hover:border-[#38383a]"
        style={{
          borderColor: rank === 1 ? getRankColor(1) : "",
        }}
      >
        <div
          className="font-extrabold text-xs rounded-lg leading-[1.1] border-[4px] border-[#1F1F22] w-7 h-7 flex-center absolute top-[2px] left-0 -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: getRankColor() }}
        >
          {rank}
        </div>
        <div className="w-full flex items-center">
          <div className="flex items-center w-full">
            <div className="mr-4 xs:mr-3 w-6 h-4 flex-center">
              <RankDiff />
            </div>
            <div className="flex flex-col xs:flex-row gap-[6px] xs:gap-0 justify-between items-start xs:items-center w-full">
              <div className="flex-center">
                <div className="w-6 mr-2">
                  <AutoHeightImage src={getItemImageSource(id)} alt="" />
                </div>
                <span className="text-sm font-medium">{name}</span>
                {warn ? (
                  <div className="ml-2 flex-center">
                    <IconWrapper className="text-red-500 text-lg">
                      <MdWarning />
                    </IconWrapper>
                  </div>
                ) : null}
              </div>
              <div
                className={`text-sm font-semibold text-[#e0e0e0] flex-center ${
                  type === "price" && valueDiff !== null
                    ? valueDiff >= 0
                      ? "text-positive"
                      : "text-negative"
                    : ""
                }`}
              >
                <span className="">
                  {value.toLocaleString()}
                  {type === "price" ? "메소" : "건"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TrendingSectionNavItem({
  children,
  selected,
  bgColor = "#202022",
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  bgColor?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex-center px-4 py-1 rounded-md ${
        selected
          ? "cursor-default"
          : "hover:bg-[#6a6a6c] cursor-pointer text-[#a0a0a0]"
      }`}
      onClick={onClick}
      style={{
        backgroundColor: selected && bgColor ? bgColor : undefined,
      }}
    >
      {children}
    </div>
  );
}

function TrendingSection({
  title,
  description,
  datas,
  type,
  supportOther = false,
  ggDatas = [],
}: {
  title: string;
  description: string;
  datas: TrendingItemData[];
  type: "price" | "volume";
  supportOther?: boolean;
  ggDatas?: TrendingItemData[];
}) {
  const [platformSection, setPlatformSection] = useRecoilState(
    platformPriceNavigatorSectionAtom
  );
  const setChartTickValue = useSetRecoilState(chartTickValueAtom);

  const { data: itemListData } = useQuery({
    queryKey: ["item-list"],
    queryFn: () => getItemList(),
    placeholderData: [],
  });

  const getItemName = (itemId: number) => {
    if (!itemListData) return "";
    return itemListData.find(({ id }) => `${id}` === `${itemId}`)?.name ?? "";
  };

  const renderingDatas = useMemo(() => {
    if (!supportOther) return datas;
    if (platformSection === "discord") return datas;
    return ggDatas;
  }, [supportOther, platformSection, datas, ggDatas]);

  return (
    <div>
      <div className="mb-6 flex flex-col">
        <div
          className={`mb-1 flex ${
            supportOther ? "justify-between" : "justify-start"
          } items-center`}
        >
          <span className="font-medium text-2xl">{title}</span>
          {supportOther ? (
            <div className="bg-[#424244] p-1 flex rounded-lg">
              <TrendingSectionNavItem
                onClick={() => {
                  setPlatformSection("discord");
                  setChartTickValue("day");
                }}
                selected={platformSection === "discord"}
                bgColor="#5865f2"
              >
                <IconWrapper className="text-lg">
                  <FaDiscord />
                </IconWrapper>
              </TrendingSectionNavItem>
              <TrendingSectionNavItem
                onClick={() => setPlatformSection("gg")}
                selected={platformSection === "gg"}
                bgColor="#FF0044"
              >
                <div className="leading-[1.1] font-bold text-sm tracking-tight">
                  .GG
                </div>
              </TrendingSectionNavItem>
            </div>
          ) : null}
        </div>
        <span className="text-[#b2b2b5] text-sm">{description}</span>
      </div>
      <div className="flex flex-col gap-[18px] pl-2">
        {...renderingDatas.map(
          ({ id, value, rank_diff, value_diff, reliable }, i) => {
            return (
              <TrendingSectionItem
                key={id}
                id={id}
                name={getItemName(id)}
                rank={i + 1}
                value={value}
                rankDiff={rank_diff}
                valueDiff={value_diff}
                type={type}
                warn={!reliable}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  titleImgSrc,
  unit,
  value,
}: {
  titleImgSrc: string;
  title: string;
  unit: string;
  value: number;
}) {
  return (
    <div className="w-full xs:w-[300px] md:w-[210px] lg:w-[280px] card-border card-bg px-6 xs:px-8 py-3 xs:py-4 border-[1px] flex flex-col">
      <div className="mb-2 flex items-center">
        <div className="w-6 mr-2 flex-cetner">
          <AutoHeightImage src={titleImgSrc} alt="" />
        </div>
        <span className="text-[#e0e0e0] text-[15px] h-[28px] flex-center">
          {title}
        </span>
      </div>
      <div>
        <span className="font-semibold text-2xl mr-1">
          {value.toLocaleString()}
        </span>
        <span className="text-sm text-[#a0a0a0]">{unit}</span>
      </div>
    </div>
  );
}

export default function Trending() {
  const { data: trendingData, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingData,
    placeholderData: undefined,
    staleTime: 1000 * 60 * 60 * 2, // 2시간 동안은 데이터 신뢰 보장
  });

  const { data: trendingGGData, isLoading: isGGLoading } = useQuery({
    queryKey: ["trending-gg"],
    queryFn: getTrendingGGData,
    placeholderData: undefined,
    staleTime: 1000 * 60 * 3, // 30분 동안은 데이터 신뢰 보장
  });

  const isTrendingLoading =
    trendingData === undefined ||
    isLoading === undefined ||
    isGGLoading ||
    trendingGGData === undefined;

  return (
    <>
      <ImbedHeader />
      <main className="w-full flex-center flex-col pt-[40px] px-4 xs:px-[35px]">
        <div className="max-w-[930px] w-full flex items-center flex-col">
          <div className="flex-center flex-col gap-2">
            <span className="font-semibold text-4xl">트렌딩</span>
            <span className="text-[#c2c2c5] text-md">
              오늘은 어떤 아이템들이 주목받고 있을까요?
            </span>
          </div>

          <div className="w-full sm:max-w-[616px] md:w-full mt-4 flex sm:grid sm:grid-cols-2 md:flex flex-col md:flex-row gap-4 justify-center items-center">
            {isTrendingLoading ? (
              <div className="w-full flex-center h-[94px]">
                <Loader />
              </div>
            ) : trendingData === null ? (
              "데이터를 불러올 수 없습니다."
            ) : (
              <>
                <div className="sm:col-span-2 w-full md:w-auto flex-center">
                  <InfoCard
                    title="오늘 거래 글"
                    titleImgSrc={getItemImageSource(4001005)} // 고대의 주문서
                    unit="건"
                    value={trendingData.counts.total}
                  />
                </div>
                <div className="w-full md:w-auto flex-center">
                  <InfoCard
                    title="주문서"
                    titleImgSrc={getItemImageSource(2043801)}
                    unit="건"
                    value={trendingData.counts.scrolls}
                  />
                </div>
                <div className="w-full md:w-auto flex-center">
                  <InfoCard
                    title="표창"
                    titleImgSrc={getItemImageSource(2070006)}
                    unit="건"
                    value={trendingData.counts.throwing_stars}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-16 w-full">
            {isTrendingLoading ? null : trendingData === null ||
              trendingGGData === null ? (
              "데이터를 불러올 수 없습니다."
            ) : (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
                <TrendingSection
                  title="가격"
                  description="사람들이 원하는 거래가들의 평균치를 의미해요."
                  type="price"
                  supportOther={true}
                  datas={trendingData.cost}
                  ggDatas={trendingGGData.price}
                />
                <TrendingSection
                  title="거래량"
                  description="오늘 0시 이후로 올라온 거래 글의 총 수를 의미해요."
                  datas={trendingData.total_results}
                  type="volume"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
