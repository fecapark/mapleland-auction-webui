"use client";

import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import { getItemImageSource, getItemList } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  itemId: string;
  updatedAt: string | null;
}

export default function ItemHeader({ itemId, updatedAt }: Props) {
  const { data: itemListData } = useQuery({
    queryKey: ["item-list"],
    queryFn: getItemList,
    placeholderData: [],
  });

  const itemName = useMemo(() => {
    if (!itemListData) return "";
    return itemListData.find(({ id }) => `${id}` === itemId)?.name ?? "";
  }, [itemId, itemListData]);

  return (
    <div className="relative mb-12 xs:mb-16 pt-8 xs:pt-24 flex-center flex-col gap-4">
      <div className="flex gap-3 xs:gap-6 items-center">
        <div className="w-[48px] xs:w-[52px]">
          <AutoHeightImage src={getItemImageSource(itemId, 2)} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-xl xs:text-2xl">{itemName}</span>
          <span className="font-medium text-[#a0a0a0] text-xs xs:text-sm">
            {updatedAt === null
              ? "데이터 없음"
              : `${updatedAt.split("-").join(".")}에 업데이트 됨`}
          </span>
        </div>
      </div>
    </div>
  );
}
