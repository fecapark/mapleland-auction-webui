import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import Loader from "@/components/utils/Loader/Loader";
import { getItemImageSource, getItemList } from "@/server/actions";
import { itemPriceNavigatorSectionAtom } from "@/shared/atoms";
import { IRecentPriceData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import FixedPriceCard from "./FixedPriceCard";
import FixedPriceCardSlider from "./FixedPriceCardSlider";
import useMediaQuery from "@/hooks/useMediaQuery";

interface Props {
  itemId: string;
  recentData: IRecentPriceData;
  active: boolean;
}

let isActiveSetted = false;

export default function FixedPriceCardContainer({
  itemId,
  recentData,
  active,
}: Props) {
  const [isTooSmallForPriceCardListing] = useMediaQuery(
    "screen and (max-width: 1000px)"
  );
  const section = useRecoilValue(itemPriceNavigatorSectionAtom);
  const { data: itemListData } = useQuery({
    queryKey: ["item-list"],
    queryFn: getItemList,
    placeholderData: [],
  });

  const isLoading =
    recentData.prevData === null || recentData.recentData === null;

  const itemName = useMemo(() => {
    if (!itemListData) return "";
    return itemListData.find(({ id }) => `${id}` === itemId)?.name ?? "";
  }, [itemId, itemListData]);

  useEffect(() => {
    if (!active && !isActiveSetted) {
      isActiveSetted = true;
    }
  }, [active]);

  useEffect(() => {
    return () => {
      isActiveSetted = false;
    };
  }, []);

  const content = useMemo(
    () => (
      <>
        <FixedPriceCard
          value={
            recentData.recentData
              ? recentData.recentData![section].expensive
              : null
          }
          prevValue={
            recentData.prevData ? recentData.prevData[section].expensive : null
          }
          type="expensive"
          onlyContent={isTooSmallForPriceCardListing}
        />
        <FixedPriceCard
          value={
            recentData.recentData
              ? recentData.recentData![section].average
              : null
          }
          prevValue={
            recentData.prevData ? recentData.prevData[section].average : null
          }
          type="average"
          onlyContent={isTooSmallForPriceCardListing}
        />
        <FixedPriceCard
          value={
            recentData.recentData
              ? recentData.recentData![section].frequent
              : null
          }
          prevValue={
            recentData.prevData ? recentData.prevData[section].frequent : null
          }
          type="frequent"
          onlyContent={isTooSmallForPriceCardListing}
        />
      </>
    ),
    [section, recentData, isTooSmallForPriceCardListing]
  );

  return (
    <div
      className={`border-b-[1px] border-[#626266] w-full backdrop-blur-md bg-[#00000055] fixed top-0 left-0 z-[10] flex-center`}
      style={{
        transform:
          active && isActiveSetted ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      <div className="max-w-[930px] w-full h-full px-4 xs:px-8 py-2 flex-center">
        <div className="flex items-center mr-2 sm:mr-6">
          <div className="w-[24px] mr-2">
            <AutoHeightImage src={getItemImageSource(itemId)} alt="" />
          </div>
          <span className="font-medium text-sm hidden sm:inline">
            {itemName}
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : isTooSmallForPriceCardListing ? (
          <FixedPriceCardSlider>{content}</FixedPriceCardSlider>
        ) : (
          <div className="flex-center gap-2">{content}</div>
        )}
      </div>
    </div>
  );
}
