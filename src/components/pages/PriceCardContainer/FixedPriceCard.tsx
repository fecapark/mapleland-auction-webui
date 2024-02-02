import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { Roboto } from "next/font/google";
import { IoMdChatbubbles } from "react-icons/io";
import { MdArrowUpward, MdShowChart } from "react-icons/md";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function FixedPriceCard({
  value,
  prevValue,
  type,
  onlyContent = false,
}: {
  value: number | null;
  prevValue: number | null;
  type: "expensive" | "average" | "frequent";
  onlyContent?: boolean;
}) {
  const Icon = () => {
    if (type === "expensive") return <MdArrowUpward />;
    if (type === "average") return <MdShowChart />;
    return <IoMdChatbubbles />;
  };

  const priceDiff =
    value === null || prevValue === null ? 0 : value - prevValue;
  const priceDiffPercent =
    value === null || prevValue === null || prevValue === 0
      ? 0
      : (priceDiff / prevValue) * 100;

  return (
    <div
      className={`${
        !onlyContent ? "card-border card-bg" : ""
      } py-2 pr-4 xs:pr-3 pl-4 xs:pl-2 flex-center leading-[1.3]`}
    >
      <div className="flex-center">
        <div className="flex-cetner mr-2">
          <IconWrapper className="text-lg">
            <Icon />
          </IconWrapper>
        </div>
        <div className="flex items-center gap-1 mr-2 xs:mr-3">
          <span className={roboto.className}>
            {value === null ? 0 : value.toLocaleString()}
          </span>
          <span className="text-xs text-[#d2d2d5]">메소</span>
        </div>
      </div>
      <div className="flex-center gap-1">
        <div
          className={`text-xs xs:text-sm ${
            priceDiffPercent >= 0 ? "text-positive" : "text-negative"
          }`}
        >
          {priceDiffPercent >= 0
            ? `+${priceDiffPercent.toFixed(1)}`
            : priceDiffPercent.toFixed(1)}
          %
        </div>
      </div>
    </div>
  );
}
