import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function Report() {
  return (
    <div>
      <p className="mb-4">클릭해주셔서 감사해요!</p>
      <p>사용하는데 있어서 불편한 점 혹은 개선을 원하는 점,</p>
      <p>어떻게 작동하는지에 관한 점,</p>
      <p>추가되었으면 좋겠는 기능,</p>
      <p>검색되면 좋겠는 아이템,</p>
      <p>시세 데이터와 관련된 점,</p>
      <p>궁금한 점,</p>
      <p>혹은 응원의 메시지...</p>
      <p className="mb-4">등등</p>
      <p>위에 해당하는 내용이 아니더라도</p>
      <p>모든 중요한 말씀에 최대한 귀 기울이고 노력하겠습니다!</p>

      <div className="mb-2 mt-6 flex">
        <Link
          href="https://open.kakao.com/o/s78BDo7f"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="card-border card-bg px-5 py-3 gap-2 flex-center hover:card-hover">
            <span className="font-semibold">
              여기로 가볍게 와주시면 됩니다!
            </span>
            <IconWrapper className="text-lg">
              <MdOpenInNew />
            </IconWrapper>
          </div>
        </Link>
      </div>

      <p className="mt-4 mb-1">혹시 몰라서, 메일도 남겨놓을게요!</p>
      <Link href="mailto:mlauctionofficial@gmail.com">
        <span className="text-[#2D7CEB] hover:underline font-semibold">
          mlauctionofficial@gmail.com
        </span>
      </Link>
    </div>
  );
}
