import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function FAQModal() {
  return (
    <div>
      <p>문의 글들을 수집한 뒤에,</p>
      <p>불편하신 점 없도록 최대한 자세하게 작성할 예정입니다.</p>

      <div className="mb-2 mt-6 flex">
        <Link
          href="https://open.kakao.com/o/s78BDo7f"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="card-border card-bg px-5 py-3 gap-2 flex-center hover:card-hover">
            <span className="font-semibold">여기로 문의하실수 있어요.</span>
            <IconWrapper className="text-lg">
              <MdOpenInNew />
            </IconWrapper>
          </div>
        </Link>
      </div>

      <p className="mt-4 mb-1">메일 주소로도 가능해요.</p>
      <Link href="mailto:mlauctionofficial@gmail.com">
        <span className="text-[#2D7CEB] hover:underline font-semibold">
          mlauctionofficial@gmail.com
        </span>
      </Link>
    </div>
  );
}
