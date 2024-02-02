"use client";

import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function PostBackButton() {
  const router = useRouter();

  return (
    <div
      className="mb-[60px] card-border card-bg pl-4 pr-6 py-2 xs:py-3 inline-flex items-center gap-2 hover:bg-[#28282a] cursor-pointer"
      onClick={() => router.back()}
    >
      <IconWrapper className="text-lg">
        <MdArrowBack />
      </IconWrapper>
      <span className="text-sm xs:text-base font-semibold">돌아가기</span>
    </div>
  );
}
