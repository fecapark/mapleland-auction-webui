import { StatisticsData } from "@/server/actions";
import { datestrAscCompareFn } from "@/utils/date";
import { ResponsiveLine, Serie } from "@nivo/line";
import Tooltip from "./Tooltip";
import {
  chartTickValueAtom,
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
  platformSection: "discord" | "gg",
  chartTickValue: "hour" | "day",
  data: Record<string, StatisticsData>
): Serie[] => {
  function addDatas(
    fr: StatisticsData,
    to: StatisticsData,
    sectionName: "overview" | "buyer" | "seller"
  ) {
    fr[sectionName].average += to[sectionName].average;
    fr[sectionName].frequent += to[sectionName].frequent;
    return fr;
  }

  function calcAverage(datas: StatisticsData, count: number) {
    datas.buyer.average = Math.round(datas.buyer.average / count);
    datas.buyer.frequent = Math.round(datas.buyer.frequent / count);

    datas.overview.average = Math.round(datas.overview.average / count);
    datas.overview.frequent = Math.round(datas.overview.frequent / count);

    datas.seller.average = Math.round(datas.seller.average / count);
    datas.seller.frequent = Math.round(datas.seller.frequent / count);

    return datas;
  }

  function dateExistsIn(
    newSortedData: [string, StatisticsData, number][],
    date: string
  ) {
    for (let i = 0; i < newSortedData.length; i++) {
      const [datestr, _, __] = newSortedData[i];
      if (datestr === date) return i;
    }
    return null;
  }

  let sortedData = Object.entries(data).sort((a, b) =>
    datestrAscCompareFn(a[0], b[0])
  );

  if (platformSection === "discord") {
    sortedData = sortedData.slice(
      Math.max(sortedData.length - 14, 0),
      sortedData.length
    );
  } else if (chartTickValue === "hour") {
    sortedData = sortedData.slice(
      Math.max(sortedData.length - 24, 0),
      sortedData.length
    );
  } else {
    const newSortedData: [string, StatisticsData, number][] = [];

    for (const [date, staticticsData] of sortedData) {
      const datestr = date.split(" ")[0];
      const dateFindedIndex = dateExistsIn(newSortedData, datestr);

      if (dateFindedIndex === null) {
        newSortedData.push([datestr, staticticsData, 1]);
        continue;
      }

      newSortedData[dateFindedIndex][2]++;

      newSortedData[dateFindedIndex][1] = addDatas(
        newSortedData[dateFindedIndex][1],
        staticticsData,
        "buyer"
      );
      newSortedData[dateFindedIndex][1] = addDatas(
        newSortedData[dateFindedIndex][1],
        staticticsData,
        "seller"
      );
      newSortedData[dateFindedIndex][1] = addDatas(
        newSortedData[dateFindedIndex][1],
        staticticsData,
        "overview"
      );

      newSortedData[dateFindedIndex][1].buyer.expensive = Math.max(
        newSortedData[dateFindedIndex][1].buyer.expensive,
        staticticsData.buyer.expensive
      );

      newSortedData[dateFindedIndex][1].seller.expensive = Math.max(
        newSortedData[dateFindedIndex][1].seller.expensive,
        staticticsData.seller.expensive
      );

      newSortedData[dateFindedIndex][1].overview.expensive = Math.max(
        newSortedData[dateFindedIndex][1].overview.expensive,
        staticticsData.overview.expensive
      );
    }

    for (let i = 0; i < newSortedData.length; i++) {
      const [_, staticticsData, count] = newSortedData[i];
      newSortedData[i][1] = calcAverage(staticticsData, count);
    }

    sortedData = newSortedData.map(([date, staticticsData, _]) => [
      date,
      staticticsData,
    ]);

    sortedData = sortedData.slice(
      Math.max(sortedData.length - 14, 0),
      sortedData.length
    );
  }

  return [
    {
      id: "최다 거래가",
      data: sortedData.map(([date, staticticsData]) => ({
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
  const chartTickValue = useRecoilValue(chartTickValueAtom);

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
      data={parseToSeries(section, platformSection, chartTickValue, chartData)}
      margin={{
        top: isXS ? 40 : 55,
        right: isXS ? 20 : 70,
        bottom: isXS ? 40 : 50,
        left: isXS ? 50 : 75,
      }}
      xScale={{
        type: "time",
        format:
          platformSection === "discord"
            ? "%Y-%m-%d"
            : chartTickValue === "hour"
            ? "%Y-%m-%d %H:%M:%S"
            : "%Y-%m-%d",
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
          platformSection === "discord"
            ? "every 1 days"
            : chartTickValue === "hour"
            ? "every 3 hours"
            : "every 1 days",
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
