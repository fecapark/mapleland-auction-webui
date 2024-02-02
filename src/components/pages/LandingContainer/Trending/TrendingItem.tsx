import { getItemImageSource } from "@/server/actions";
import AutoHeightImage from "../../../utils/AutoHeightImage/AutoHeightImage";
import { useState } from "react";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { IoMdChatboxes, IoMdPricetag } from "react-icons/io";
import Link from "next/link";

export default function TrendingItem({
  id,
  name,
  value,
  rank,
  type,
  preview = false,
}: {
  id: string;
  name: string;
  value: number;
  rank: number;
  type: "price" | "volume";
  preview?: boolean;
}) {
  const [isHover, setIsHover] = useState(false);
  const tActive = isHover || preview;

  const getRankColor = () => {
    if (rank === 1) return "#ffbb00";
    if (rank === 2) return "#a0a0a0";
    if (rank === 3) return "#cd7f32";
    if (rank === 4) return "#4C3E41";
    return "#1F1F22";
  };

  const content = (
    <div
      className="[transition:padding-bottom_0.1s_cubic-bezier(0.2,0,0,1)] relative flex-center px-3 xs:px-4 py-3 bg-[#303032] rounded-md border-[1px] border-transparent hover:border-[#626266]"
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      style={{
        cursor: preview ? "default" : "pointer",
        paddingBottom: tActive ? "3rem" : "",
        transitionDelay: tActive ? "0.1s" : "0s",
      }}
    >
      <div
        className="font-extrabold text-xs rounded-lg leading-[1.1] border-[4px] border-[#1F1F22] w-7 h-7 flex-center absolute top-[6px] left-0 -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: getRankColor() }}
      >
        {rank}
      </div>
      <div className="absolute bottom-0 w-full">
        <div
          className="text-sm text-[#d2d2d6] py-2 flex-center border-t-[1px] [transition:opacity_0.1s_cubic-bezier(0.2,0,0,1),border_0.1s_cubic-bezier(0.2,0,0,1)]"
          style={{
            opacity: tActive ? 1 : 0,
            borderColor: tActive ? "#626266ff" : "#62626600",
            transitionDelay: tActive ? "0.1s" : "0s",
          }}
        >
          <IconWrapper className="text-lg mr-1">
            {type === "volume" ? <IoMdChatboxes /> : <IoMdPricetag />}
          </IconWrapper>
          <span className="xs:text-sm text-xs">{value.toLocaleString()}</span>
        </div>
      </div>
      <div className="w-6 mr-2">
        <AutoHeightImage src={getItemImageSource(id)} alt="" />
      </div>
      <span className="xs:text-sm text-xs font-medium xs:font-normal">
        {name}
      </span>
    </div>
  );

  if (preview) {
    return <div className="inline">{content}</div>;
  }

  return <Link href={`/prices/${id}`}>{content}</Link>;
}
