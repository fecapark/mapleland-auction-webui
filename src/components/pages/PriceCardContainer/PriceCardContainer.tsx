import { IoMdChatbubbles } from "react-icons/io";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdShowChart,
  MdWarning,
} from "react-icons/md";
import PriceCard from "./PriceCard";
import { useRecoilValue } from "recoil";
import { itemPriceNavigatorSectionAtom } from "@/shared/atoms";
import { StatisticsData } from "@/server/actions";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import SwitchablePriceCard from "./SwitchablePriceCard";

function NoData({
  sectionType,
}: {
  sectionType: "overview" | "buyer" | "seller";
}) {
  const getSectionString = () => {
    if (sectionType === "overview") return "시세";
    if (sectionType === "buyer") return "구매";
    if (sectionType === "seller") return "판매";
  };

  return (
    <div className="px-6 xs:px-10 py-5 border-[1px] border-[#626266] rounded-xl flex-center flex-col text-center">
      <IconWrapper className="mb-5 text-4xl text-[#b2b2b5]">
        <MdWarning />
      </IconWrapper>
      <span className="text-[#b2b2b5] font-medium mb-2">
        수집된 {getSectionString()} 데이터가 없어요.
      </span>
      <span className="text-[#a0a0a0] text-xs xs:text-sm">
        거래량이 너무 적거나,
        <br />
        아직 게임에 존재하지 않는 아이템일 수 있어요.
      </span>
    </div>
  );
}

export default function PriceCardContainer({
  recentData,
  prevData,
}: {
  recentData: StatisticsData | null;
  prevData: StatisticsData | null;
}) {
  const section = useRecoilValue(itemPriceNavigatorSectionAtom);

  if (!recentData) return <NoData sectionType={section} />;
  if (recentData[section].average === 0)
    return <NoData sectionType={section} />;

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 w-full lg:w-auto">
      <SwitchablePriceCard
        frontIcon={<MdArrowUpward />}
        frontTitle="최고 거래가"
        backIcon={<MdArrowDownward />}
        backTitle="최저 거래가"
        frontPrice={recentData[section].expensive}
        backPrice={recentData[section].minimum}
        frontPrevPrice={prevData === null ? null : prevData[section].expensive}
        backPrevPrice={prevData === null ? null : prevData[section].minimum}
      />
      <PriceCard
        icon={<MdShowChart />}
        title="평균 거래가"
        price={recentData[section].average}
        prevPrice={prevData === null ? null : prevData[section].average}
      />
      <PriceCard
        icon={<IoMdChatbubbles />}
        title="최다 거래가"
        price={recentData[section].frequent}
        prevPrice={prevData === null ? null : prevData[section].frequent}
      />
    </div>
  );
}
