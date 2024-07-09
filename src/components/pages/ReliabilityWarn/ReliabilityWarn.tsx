"use client";

import ReliabilityWarnInfo from "@/components/modals/contents/ReliabilityWarnInfo";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";
import { MdInfoOutline, MdWarning } from "react-icons/md";

export default function ReliabilityWarn() {
  const setModal = useModal({
    title: "신뢰성이 낮은 시세",
    content: <ReliabilityWarnInfo />,
  });

  useEffect(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);

  return (
    <div className="flex-center">
      <div className="flex justify-between items-center px-1 xs:px-2 py-0 border-[1px] mt-6 xs:mt-8 border-[#626266] rounded-lg">
        <div className="flex-center pl-4 mr-4 xs:mr-1">
          <IconWrapper className="relative text-lg xs:text-xl mr-2 xs:mr-3 text-[red]">
            <MdWarning />
          </IconWrapper>
          <span className="text-xs xs:text-sm">
            현재 이 아이템의 시세는 신뢰성이 낮아요
          </span>
        </div>
        <div
          className="w-10 h-10 flex-center cursor-pointer hover:bg-[#2a2a2c] rounded-[50%]"
          onClick={() => setModal(true)}
        >
          <IconWrapper className="text-xl text-[#b2b2b4]">
            <MdInfoOutline />
          </IconWrapper>
        </div>
      </div>
    </div>
  );
}
