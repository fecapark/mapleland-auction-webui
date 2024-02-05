"use client";

import useModal from "@/hooks/useModal";
import Report from "../modals/contents/Report";
import { useEffect } from "react";
import FAQModal from "../modals/contents/FAQ";
import Link from "next/link";

function FooterButton({
  alerting = false,
  onClick = () => {},
  children,
}: {
  alerting?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="relative font-medium text-sm xs:text-base text-center hover:underline cursor-pointer"
    >
      {alerting ? (
        <div className="absolute top-[-1px] left-[calc(100%+1px)] w-[6px] h-[6px] rounded-[50%] bg-red-600"></div>
      ) : null}
      {children}
    </div>
  );
}

export default function Footer() {
  const setReportModal = useModal({
    title: "버그 제보 및 문의하기",
    content: <Report />,
  });

  const setFAQModal = useModal({
    title: "FAQ",
    content: <FAQModal />,
  });

  return (
    <footer className="py-8 px-4 w-full bg-[#28282a] mt-[120px] flex-center flex-col text-[#d2d2d4]">
      <div className="flex-center gap-6 xs:gap-8 mb-6">
        <FooterButton>
          <Link href="/notices">공지사항</Link>
        </FooterButton>
        <FooterButton alerting={true}>
          <Link href="/updates">업데이트</Link>
        </FooterButton>
        <FooterButton>
          <Link href="/notices/faq">FAQ</Link>
        </FooterButton>
        <FooterButton onClick={() => setReportModal(true)}>
          버그 제보 및 문의하기
        </FooterButton>
      </div>

      <div className="flex-center gap-1 flex-col text-xs xs:text-sm">
        <span>
          {new Date().getFullYear()} &copy; Mapleland Auction. All rights
          reserved.
        </span>
        <span className="text-center">
          메이플랜드 옥션의 모든 시세 데이터는 어떠한 경우에도 악의적으로
          조작되거나 왜곡된 데이터가 아님을 약속드립니다.
        </span>
      </div>
    </footer>
  );
}
