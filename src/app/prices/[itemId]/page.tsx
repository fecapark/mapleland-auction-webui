"use client";

import ItemHeader from "@/components/pages/ItemHeader/ItemHeader";
import ItemPriceChart from "@/components/pages/ItemPriceChart/ItemPriceChart";
import ItemPriceNavigator from "@/components/pages/Navigator/ItemPriceNavigator";
import PriceCardContainer from "@/components/pages/PriceCardContainer/PriceCardContainer";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import {
  getGGItemStatistics,
  getItemList,
  getItemStatistics,
} from "@/server/actions";
import { datestrAscCompareFn, dbDatestrAscCompareFn } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useMemo, useState } from "react";
import { MdWarning, MdSsidChart, MdInfoOutline } from "react-icons/md";
import MessageContainer from "@/components/pages/MessageContainer/MessageContainer";
import useModal from "@/hooks/useModal";
import ReliabilityWarnInfo from "@/components/modals/contents/ReliabilityWarnInfo";
import Loader from "@/components/utils/Loader/Loader";
import FixedPriceCardContainer from "@/components/pages/PriceCardContainer/FixedPriceCardContainer";
import { IRecentPriceData } from "@/shared/types";
import { useInView } from "react-intersection-observer";
import ImbedHeader from "@/components/pages/ImbedHeader/ImbedHeader";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chartTickValueAtom,
  itemPriceNavigatorSectionAtom,
  platformPriceNavigatorSectionAtom,
} from "@/shared/atoms";
import { FaDiscord } from "react-icons/fa";
import { db } from "@/shared/firestore";

interface RouteParams {
  itemId: string;
}

function SmallNavItem({
  children,
  selected,
  bgColor = "#202020",
  onClick,
}: {
  children: React.ReactNode;
  bgColor?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex-center rounded-lg px-3 xs:px-4 py-1 xs:py-1 ${
        selected
          ? `cursor-default`
          : "hover:bg-[#6a6a6c] cursor-pointer text-[#a0a0a0]"
      }`}
      data-section-selected={selected}
      onClick={onClick}
      style={{
        backgroundColor: selected && bgColor ? bgColor : undefined,
      }}
    >
      {children}
    </div>
  );
}

function ReliabilityWarn() {
  const setModal = useModal({
    title: "신뢰성이 낮은 시세",
    content: <ReliabilityWarnInfo />,
  });

  useEffect(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);

  return (
    <div className="flex-center">
      <div className="flex justify-between items-center px-1 xs:px-2 py-0 border-[1px] mt-6 xs:mt-8 border-[#626266] rounded-lg">
        <div className="flex-center pl-4 mr-4 xs:mr-1">
          <IconWrapper className="relative text-lg xs:text-xl mr-2 xs:mr-3 text-[red]">
            <MdWarning />
          </IconWrapper>
          <span className="text-xs xs:text-sm">
            현재 이 아이템의 시세는 신뢰성이 낮아요
          </span>
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
    </div>
  );
}

export default function ItemPricePage({
  params: { itemId },
}: {
  params: RouteParams;
}) {
  const { ref, inView } = useInView();
  const [platformSection, setPlatformSection] = useRecoilState(
    platformPriceNavigatorSectionAtom
  );
  const [chartTickValue, setChartTickValue] =
    useRecoilState(chartTickValueAtom);
  const [isSeparated, setIsSeparated] = useState(false);

  const { data: statisticsData, isLoading } = useQuery({
    queryKey: ["statistics", itemId],
    queryFn: async () => getItemStatistics(itemId),
    placeholderData: undefined,
    staleTime: 1000 * 60 * 60 * 2, // 2시간 동안은 데이터 신뢰 보장
  });

  const { data: ggStatisticsData, isLoading: isGGLoading } = useQuery({
    queryKey: ["statistics-gg", itemId],
    queryFn: async () => getGGItemStatistics(itemId),
    placeholderData: undefined,
    staleTime: 1000 * 60 * 30, // 30분 동안은 데이터 신뢰 보장
  });

  const { data: itemListData } = useQuery({
    queryKey: ["item-list"],
    queryFn: getItemList,
    placeholderData: [],
  });

  const itemName = useMemo(() => {
    if (!itemListData) return "";
    return itemListData.find(({ id }) => `${id}` === itemId)?.name ?? "";
  }, [itemId, itemListData]);

  const isStatisticsLoading =
    isLoading ||
    statisticsData === undefined ||
    isGGLoading ||
    ggStatisticsData === undefined;

  const isStatisticsNotFound = useMemo(() => {
    if (platformSection === "discord")
      return !isStatisticsLoading && statisticsData === null;

    return !isGGLoading && ggStatisticsData === null;
  }, [
    platformSection,
    isStatisticsLoading,
    statisticsData,
    isGGLoading,
    ggStatisticsData,
  ]);

  const recentData: IRecentPriceData = useMemo(() => {
    let data =
      platformSection === "discord" ? statisticsData : ggStatisticsData;

    if (!data)
      return {
        recentDate: null,
        prevDate: null,
        recentData: null,
        prevData: null,
      };

    const datesByRecent = Object.keys(data)
      .sort(dbDatestrAscCompareFn)
      .reverse();
    const recentDatestr = datesByRecent[0];
    const prevDatestr = datesByRecent[1];
    return {
      recentDate: recentDatestr,
      prevDate: prevDatestr,
      recentData: data[recentDatestr],
      prevData: data[prevDatestr],
    };
  }, [statisticsData, ggStatisticsData, platformSection]);

  const disableOverview = useMemo(() => {
    return isSeparated && platformSection === "discord";
  }, [isSeparated, platformSection]);

  useEffect(() => {
    if (platformSection === "gg") return;
    if (!recentData.recentData) return;

    if (recentData.recentData.separated) {
      setIsSeparated(true);
    }
  }, [platformSection, recentData]);

  useEffect(() => {
    return () => {
      setChartTickValue("day");
    };
  }, [setChartTickValue]);

  return (
    <>
      <ImbedHeader />
      {isStatisticsLoading ? (
        <div className="w-full flex-center min-h-[85vh]">
          <Loader />
        </div>
      ) : (
        <main className="flex flex-col items-center justify-start px-4 xs:px-0">
          <div className="bg-[#424244] p-1 flex gap-1 rounded-lg">
            <SmallNavItem
              onClick={() => {
                setPlatformSection("discord");
                setChartTickValue("day");
              }}
              selected={platformSection === "discord"}
              bgColor="#5865f2"
            >
              <IconWrapper className="text-xl">
                <FaDiscord />
              </IconWrapper>
            </SmallNavItem>
            <SmallNavItem
              onClick={() => setPlatformSection("gg")}
              selected={platformSection === "gg"}
              bgColor="#FF0044"
            >
              <div className="leading-[1.1] font-bold text-base tracking-tight">
                .GG
              </div>
            </SmallNavItem>
          </div>
          {/* <FixedPriceCardContainer
            itemId={itemId}
            recentData={recentData}
            active={!inView}
          /> */}
          <div className="flex flex-col items-center w-full">
            <ItemHeader
              itemId={itemId}
              itemName={itemName}
              updatedAt={recentData.recentDate}
            />
            <ItemPriceNavigator disableOverview={disableOverview} />
            {!isStatisticsNotFound && !recentData.recentData?.reliable ? (
              <ReliabilityWarn />
            ) : null}
            <div className="mt-6 xs:mt-8 w-full xs:w-auto" ref={ref}>
              <PriceCardContainer
                recentData={
                  recentData.recentData ? recentData.recentData : null
                }
                prevData={recentData.prevData ? recentData.prevData : null}
              />
            </div>
            <div className="max-w-[auto] xs:max-w-[1000px] w-full px-0 xs:px-[35px]">
              {/* 차트 */}
              <div className="w-full mt-6 py-4 card-border bg-[#1F1F22]">
                <div className="px-6 xs:px-8 flex justify-between items-center">
                  <div className="flex items-center gap-1 mb-2">
                    <IconWrapper className="text-xl">
                      <MdSsidChart />
                    </IconWrapper>
                    <span>시세 변동</span>
                  </div>
                  <div className="bg-[#424244] p-1 flex gap-1 rounded-lg text-sm">
                    <SmallNavItem
                      onClick={() => setChartTickValue("day")}
                      selected={chartTickValue === "day"}
                    >
                      일
                    </SmallNavItem>
                    <SmallNavItem
                      onClick={() => setChartTickValue("hour")}
                      selected={chartTickValue === "hour"}
                    >
                      시간
                    </SmallNavItem>
                  </div>
                </div>
                <div className="w-full h-[300px] xs:h-[400px] sm:h-[500px]">
                  <ItemPriceChart
                    chartData={
                      platformSection === "discord"
                        ? statisticsData
                        : ggStatisticsData
                    }
                  />
                </div>
              </div>
              {/* 메시지 */}
              <div className="w-full">
                <MessageContainer itemId={itemId} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
