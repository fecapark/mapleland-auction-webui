import { platformPriceNavigatorSectionAtom } from "@/shared/atoms";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";

interface Props {
  tick: any;
}

const getDateContent = (datestr: string, platformSection: "discord" | "gg") => {
  const date = dayjs(datestr, "YYYY-MM-DD HH:mm:ss").subtract(9, "hour");
  const year = date.get("year");
  const month = date.get("month") + 1;
  const day = date.get("date");
  let hour = date.get("hour");

  if (platformSection === "discord") {
    // 새해에는 년도만 표시
    if (month === 1 && day === 1)
      return { big: true, bold: true, content: `${year}` };

    // 매 월마다 월 표시
    if (day === 1) return { big: false, bold: true, content: `${month}월` };

    // 매 3일 마다 일 표시
    if (day % 3 === 0) return { big: false, bold: false, content: `${day}` };
  }

  if (platformSection === "gg") {
    // 새해에는 년도만 표시
    if (month === 1 && day === 1 && hour === 0)
      return { big: true, bold: true, content: `${year}` };

    // 매 월마다 월 표시
    if (day === 1 && hour === 0)
      return { big: false, bold: true, content: `${month}월` };

    // 매일마다 일 표시
    if (hour === 0) return { big: false, bold: true, content: `${day}` };

    // 매 3시간 마다 시간 표시
    if (hour % 1 === 0)
      return {
        big: false,
        bold: false,
        content: `${hour < 10 ? "0" : ""}${hour}:00`,
      };
  }

  return { big: false, bold: false, content: null };
};

export default function BottomTick({ tick }: Props) {
  const platformSection = useRecoilValue(platformPriceNavigatorSectionAtom);
  const { big, bold, content } = getDateContent(tick.value, platformSection);

  return (
    <g
      key={tick.value}
      style={{
        transform: `translate(${tick.x}px, ${tick.y}px)`,
        opacity: tick.opacity,
      }}
    >
      <line
        x1="0"
        x2={tick.lineX}
        y1="0"
        y2={tick.lineY}
        style={{
          stroke: "rgb(119, 119, 119)",
          strokeWidth: 1,
        }}
      ></line>
      <text
        style={{
          alignmentBaseline: tick.textBaseline,
          textAnchor: tick.textAnchor,
          transform: `translate(${tick.textX}px, ${tick.textY}px)`,
          fontSize: big ? 14 : 12,
          fontWeight: bold ? 700 : 400,
          fill: "#c2c2c5",
          outlineWidth: 0,
          outlineColor: "transparent",
          letterSpacing: 0.5,
        }}
      >
        {content}
      </text>
    </g>
  );
}
