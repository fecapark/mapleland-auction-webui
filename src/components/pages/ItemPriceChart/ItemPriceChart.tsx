import { StatisticsData } from "@/server/actions";
import { datestrAscCompareFn } from "@/utils/date";
import { ResponsiveLine, Serie } from "@nivo/line";
import Tooltip from "./Tooltip";
import {
  itemPriceNavigatorSectionAtom,
  platformPriceNavigatorSectionAtom,
  xsMediaMatchedAtom,
} from "@/shared/atoms";
import { useRecoilValue } from "recoil";
import BottomTick from "./BottomTick";
import LeftTick from "./LeftTick";

interface Props {
  chartData: Record<string, StatisticsData> | null;
}

const parseToSeries = (
  section: "overview" | "buyer" | "seller",
  data: Record<string, StatisticsData>
): Serie[] => {
  let sortedData = Object.entries(data).sort((a, b) =>
    datestrAscCompareFn(a[0], b[0])
  );
  sortedData = sortedData.slice(
    Math.max(sortedData.length - 14, 0),
    sortedData.length
  );

  return [
    {
      id: "최다 거래가",
      data: sortedData.map(([date, staticticsData], i) => ({
        x: date,
        y: staticticsData[section].frequent,
      })),
    },
    {
      id: "평균 거래가",
      data: sortedData.map(([date, staticticsData]) => ({
        x: date,
        y: staticticsData[section].average,
      })),
    },
    {
      id: "최고 거래가",
      data: sortedData.map(([date, staticticsData]) => ({
        x: date,
        y: staticticsData[section].expensive,
      })),
    },
  ];
};

export default function ItemPriceChart({ chartData }: Props) {
  const { isXS } = useRecoilValue(xsMediaMatchedAtom);
  const section = useRecoilValue(itemPriceNavigatorSectionAtom);
  const platformSection = useRecoilValue(platformPriceNavigatorSectionAtom);

  console.log(chartData);

  if (chartData === null) return <div></div>;

  return (
    <ResponsiveLine
      theme={{
        text: {
          fill: "white",
        },
        grid: {
          line: {
            strokeWidth: 0,
          },
        },
        crosshair: {
          line: {
            stroke: "#f2f2f2",
            strokeWidth: 1,
            strokeOpacity: 1,
          },
        },
      }}
      tooltip={({ point }) => <Tooltip point={point} />}
      data={parseToSeries(section, chartData)}
      margin={{
        top: isXS ? 40 : 55,
        right: isXS ? 20 : 70,
        bottom: isXS ? 40 : 50,
        left: isXS ? 50 : 75,
      }}
      xScale={{
        type: "time",
        format: platformSection === "discord" ? "%Y-%m-%d" : "%Y-%m-%d.%H:",
        precision: "hour",
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisBottom={{
        renderTick: (tick) => <BottomTick tick={tick} />,
        tickValues:
          platformSection === "discord" ? "every 1 days" : "every 3 hours",
        tickSize: 12,
        tickPadding: 10,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        renderTick: (tick) => <LeftTick tick={tick} />,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={8}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={["#F4D35F", "#EF984B", "#F1583C"]}
      legends={[
        {
          anchor: "top-left",
          direction: "row",
          justify: false,
          translateX: isXS ? -24 : -42,
          translateY: -40,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
