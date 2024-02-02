import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { Point } from "@nivo/line";
import { Roboto } from "next/font/google";
import { IoMdChatbubbles } from "react-icons/io";
import { MdArrowUpward, MdShowChart } from "react-icons/md";

interface Props {
  point: Point;
}

const roboto = Roboto({ subsets: ["latin"], weight: ["500"] });

const getTooltipIcon = (serieId: string | number) => {
  if (serieId === "최고 거래가") return <MdArrowUpward />;
  if (serieId === "평균 거래가") return <MdShowChart />;
  if (serieId === "최다 거래가") return <IoMdChatbubbles />;
  return null;
};

export default function Tooltip({ point }: Props) {
  const date = new Date(point.data.xFormatted);
  const price = point.data.yFormatted;

  return (
    <div
      style={{ borderColor: point.serieColor }}
      className="bg-[#2d2d2f] border-[1px] border-[#626266] px-3 py-2 rounded-lg flex flex-col"
    >
      <div className="flex flex-col mb-2">
        <div className="flex items-center">
          <IconWrapper className="text-lg mr-1">
            {getTooltipIcon(point.serieId)}
          </IconWrapper>
          <span className="text-sm font-medium">{point.serieId}</span>
        </div>
        <span className="text-xs font-medium text-[#a0a0a0]">
          {date.getFullYear()}-{date.getMonth() < 9 ? "0" : ""}
          {date.getMonth() + 1}-{date.getDate()}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className={`text-lg font-bold ${roboto.className}`}>
          {parseInt(`${price}`).toLocaleString()}
        </span>
        <span className="text-xs text-[#c2c2c2]">메소</span>
      </div>
    </div>
  );
}
