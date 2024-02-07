"use client";

import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import { getItemImageSource } from "@/server/actions";
import dayjs from "dayjs";

interface Props {
  itemId: string;
  itemName: string;
  updatedAt: string | null;
}

function parseUpdatedAt(updatedAt: string) {
  const date = dayjs(updatedAt, "YYYY-MM-DD HH:mm:ss");
  const curDate = dayjs();
  const diff = curDate.diff(date, "second");
  const diffHour = Math.floor(diff / 3600);
  const diffDay = Math.floor(diff / 86400);

  if (diffDay >= 1) {
    return `${date.get("year") - 2000}.${date.get("month") < 9 ? "0" : ""}${
      date.get("month") + 1
    }.${date.get("date") < 10 ? "0" : ""}${date.get("date")}`;
  }

  if (isNaN(diffHour)) return "최소 1시간 전";

  return `${diffHour}시간 전`;
}

export default function ItemHeader({ itemId, itemName, updatedAt }: Props) {
  return (
    <>
      <div className="relative mb-10 xs:mb-16 pt-12 xs:pt-16 flex-center flex-col gap-4">
        <div className="flex gap-3 xs:gap-6 items-center">
          <div className="w-[48px] xs:w-[52px]">
            <AutoHeightImage src={getItemImageSource(itemId, 2)} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xl xs:text-2xl">{itemName}</span>
            <span className="font-medium text-[#a0a0a0] text-xs xs:text-sm">
              {updatedAt === null
                ? "데이터 없음"
                : `${parseUpdatedAt(updatedAt)}에 업데이트 됨`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
