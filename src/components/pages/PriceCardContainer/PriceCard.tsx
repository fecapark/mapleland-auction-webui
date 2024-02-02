import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function PriceCard({
  title,
  icon,
  price,
  prevPrice,
}: {
  title: string;
  icon: React.ReactNode;
  price: number | null;
  prevPrice: number | null;
  highlight?: boolean;
}) {
  const priceDiff =
    price === null || prevPrice === null ? 0 : price - prevPrice;
  const priceDiffPercent =
    price === null || prevPrice === null || prevPrice === 0
      ? 0
      : (priceDiff / prevPrice) * 100;

  return (
    <div className="card-border card-bg flex flex-col px-6 xs:px-8 py-3 xs:py-4 min-w-[auto] xs:min-w-[397px] lg:min-w-[300px]">
      <div className="flex items-center mb-2 xs:mb-4">
        <IconWrapper className="text-[20px] mr-1">{icon}</IconWrapper>
        <span className="text-xs xs:text-sm">{title}</span>
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
