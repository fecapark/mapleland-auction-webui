"use client";

import ItemHeader from "@/components/pages/ItemHeader/ItemHeader";
import ItemPriceChart from "@/components/pages/ItemPriceChart/ItemPriceChart";
import ItemPriceNavigator from "@/components/pages/Navigator/ItemPriceNavigator";
import PriceCardContainer from "@/components/pages/PriceCardContainer/PriceCardContainer";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { getItemStatistics } from "@/server/actions";
import { datestrAscCompareFn } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { MdWarning, MdSsidChart, MdInfoOutline } from "react-icons/md";
import MessageContainer from "@/components/pages/MessageContainer/MessageContainer";
import useModal from "@/hooks/useModal";
import ReliabilityWarnInfo from "@/components/modals/contents/ReliabilityWarnInfo";
import Loader from "@/components/utils/Loader/Loader";
import FixedPriceCardContainer from "@/components/pages/PriceCardContainer/FixedPriceCardContainer";
import { IRecentPriceData } from "@/shared/types";
import { useInView } from "react-intersection-observer";
import ImbedHeader from "@/components/pages/ImbedHeader/ImbedHeader";

interface RouteParams {
  itemId: string;
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

  const { data: statisticsData, isLoading } = useQuery({
    queryKey: ["statistics", itemId],
    queryFn: async () => getItemStatistics(itemId),
    placeholderData: undefined,
    staleTime: 1000 * 60 * 60 * 2, // 2시간 동안은 데이터 신뢰 보장
  });

  const isStatisticsLoading = isLoading || statisticsData === undefined;
  const isStatisticsNotFound = !isStatisticsLoading && statisticsData === null;

  const recentData: IRecentPriceData = useMemo(() => {
    if (!statisticsData)
      return {
        recentDate: null,
        prevDate: null,
        recentData: null,
        prevData: null,
      };

    const datesByRecent = Object.keys(statisticsData)
      .sort(datestrAscCompareFn)
      .reverse();
    const recentDatestr = datesByRecent[0];
    const prevDatestr = datesByRecent[1];
    return {
      recentDate: recentDatestr,
      prevDate: prevDatestr,
      recentData: statisticsData[recentDatestr],
      prevData: statisticsData[prevDatestr],
    };
  }, [statisticsData]);

  return (
    <>
      <ImbedHeader />
      {isStatisticsLoading ? (
        <div className="w-full flex-center min-h-[85vh]">
          <Loader />
        </div>
      ) : (
        <main className="flex items-start justify-center px-4 xs:px-0">
          <FixedPriceCardContainer
            itemId={itemId}
            recentData={recentData}
            active={!inView}
          />
          <div className="flex flex-col items-center w-full">
            <ItemHeader itemId={itemId} updatedAt={recentData.recentDate} />
            <ItemPriceNavigator />
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
                <div className="px-6 xs:px-8">
                  <div className="flex items-center gap-1 mb-2">
                    <IconWrapper className="text-xl">
                      <MdSsidChart />
                    </IconWrapper>
                    <span>시세 변동</span>
                  </div>
                </div>
                <div className="w-full h-[300px] xs:h-[400px] sm:h-[500px]">
                  <ItemPriceChart chartData={statisticsData} />
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
