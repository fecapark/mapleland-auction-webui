import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { Roboto } from "next/font/google";
import { useMemo, useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdCompareArrows,
} from "react-icons/md";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

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
      className={`flex-center rounded-lg px-2 py-1 ${
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

export default function SwitchablePriceCard({
  frontTitle,
  backTitle,
  frontIcon,
  backIcon,
  frontPrice,
  frontPrevPrice,
  backPrice,
  backPrevPrice,
}: {
  frontTitle: string;
  frontPrice: number | null;
  frontIcon: React.ReactNode;
  frontPrevPrice: number | null;
  backTitle: string;
  backIcon: React.ReactNode;
  backPrice: number | null;
  backPrevPrice: number | null;
}) {
  const [isFront, setIsFront] = useState(true);

  const icon = useMemo(() => {
    return isFront ? frontIcon : backIcon;
  }, [isFront, frontIcon, backIcon]);

  const title = useMemo(() => {
    return isFront ? frontTitle : backTitle;
  }, [isFront, frontTitle, backTitle]);

  const price = useMemo(() => {
    return isFront ? frontPrice : backPrice;
  }, [isFront, frontPrice, backPrice]);

  const prevPrice = useMemo(() => {
    return isFront ? frontPrevPrice : backPrevPrice;
  }, [isFront, frontPrevPrice, backPrevPrice]);

  const priceDiff = useMemo(() => {
    return price === null || prevPrice === null ? 0 : price - prevPrice;
  }, [price, prevPrice]);

  const priceDiffPercent = useMemo(() => {
    return price === null || prevPrice === null || prevPrice === 0
      ? 0
      : (priceDiff / prevPrice) * 100;
  }, [price, priceDiff, prevPrice]);

  return (
    <div className="card-border card-bg flex flex-col pl-6 pr-3 xs:pl-8 xs:pr-3 pb-3 pt-2 xs:pb-4 xs:pt-2 min-w-[auto] xs:min-w-[397px] lg:min-w-[300px]">
      <div className="flex items-center justify-between mb-0 xs:mb-2">
        <div className="flex items-center">
          <IconWrapper className="text-[20px] mr-1">{icon}</IconWrapper>
          <span className="text-xs xs:text-sm">{title}</span>
        </div>
        <div className="bg-[#424244] p-1 flex gap-1 rounded-lg">
          <SmallNavItem selected={isFront} onClick={() => setIsFront(true)}>
            <IconWrapper>
              <MdArrowUpward />
            </IconWrapper>
          </SmallNavItem>
          <SmallNavItem selected={!isFront} onClick={() => setIsFront(false)}>
            <IconWrapper>
              <MdArrowDownward />
            </IconWrapper>
          </SmallNavItem>
        </div>
      </div>

      <div className="mb-1 xs:mb-2">
        <span
          className={`${roboto.className} font-medium text-3xl xs:text-4xl`}
        >
          {price === null ? 0 : price.toLocaleString()}
        </span>
        <span className="ml-2 text-sm text-[#D2D2D5]">메소</span>
      </div>

      <div className="flex items-center gap-1 xs:gap-2 text-sm xs:text-base">
        <span className="text-[#A0A0A0] text-sm">전일대비</span>
        <span className={priceDiff >= 0 ? "text-positive" : "text-negative"}>
          {priceDiff > 0
            ? `+${priceDiff.toLocaleString()}`
            : priceDiff.toLocaleString()}
        </span>
        <span
          className={priceDiffPercent >= 0 ? "text-positive" : "text-negative"}
        >
          {priceDiffPercent >= 0
            ? `+${priceDiffPercent.toFixed(1)}`
            : priceDiffPercent.toFixed(1)}
          %
        </span>
      </div>
    </div>
  );
}
