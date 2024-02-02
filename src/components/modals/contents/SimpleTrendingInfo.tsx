import TrendingItem from "@/components/pages/LandingContainer/Trending/TrendingItem";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function SimpleTrendingInfo() {
  return (
    <div>
      <div className="mb-8 text-[#c2c2c5]">
        이전 거래일의 데이터를 종합하여
        <br />
        트렌딩 기준에 따른 아이템들을 보여드려요.
      </div>
      <div className="mb-6">
        <div className="mb-3 font-medium text-[15px]">
          # 가격이 가장 비싼 순
        </div>
        <div className="pl-2">
          <div className="mb-2 flex">
            <TrendingItem
              id="2070005"
              name="뇌전 수리검"
              rank={1}
              type="price"
              value={100000000}
              preview={true}
            />
          </div>
          <div className="text-[#c2c2c5]">
            <b>전날</b> 뇌전 수리검이 <b>종합 시세 평균 1억 메소</b>
            로<br />
            가장 비싸게 거래되었음을 의미해요.
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-3 font-medium text-[15px]">
          # 거래 언급이 많은 순
        </div>
        <div className="pl-2">
          <div className="mb-2 flex">
            <TrendingItem
              id="2040804"
              name="장갑 공격력 주문서 60%"
              rank={1}
              type="volume"
              value={8056}
              preview={true}
            />
          </div>
          <div className="text-[#c2c2c5]">
            <b>전날</b> 장갑 공격력 주문서 60%가
            <br />
            <b>판매 및 구매 글이 8,056개</b>로 가장 인기가 많았음을 의미해요.
          </div>
        </div>
      </div>
      <div className="mb-2 flex">
        <Link href="/trending">
          <div className="card-border card-bg px-5 py-3 gap-2 flex-center hover:card-hover">
            <span>더 많은 트렌딩 아이템 보기</span>
            <IconWrapper className="text-lg">
              <MdOpenInNew />
            </IconWrapper>
          </div>
        </Link>
      </div>
    </div>
  );
}
