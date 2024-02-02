import { useState } from "react";
import AutoHeightImage from "../../../utils/AutoHeightImage/AutoHeightImage";
import { IconWrapper } from "../../../utils/IconWrapper/IconWrapper";
import { MdKeyboardArrowRight, MdSubdirectoryArrowLeft } from "react-icons/md";
import { getItemImageSource } from "@/server/actions";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { xsMediaMatchedAtom } from "@/shared/atoms";

function VisualEnterKey() {
  const { isXS } = useRecoilValue(xsMediaMatchedAtom);

  return (
    <div className="flex-center px-2 rounded-md min-w-7 h-7 bg-[#323233] border-b-2 border-[#121216]">
      <span className="leading-10 text-xs font-extrabold text-[#bdbdc4]">
        {isXS ? (
          <IconWrapper>
            <MdSubdirectoryArrowLeft />
          </IconWrapper>
        ) : (
          "ENTER"
        )}
      </span>
    </div>
  );
}

export default function SearchItem({
  id,
  name,
  keyFocused,
}: {
  id: number;
  name: string;
  keyFocused: boolean;
}) {
  const [isHover, setIsHover] = useState(false);
  const isActive = keyFocused || isHover;

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Link href={`/prices/${id}`}>
      <div
        className={`pl-5 ${
          keyFocused ? "pl-[16px] border-l-[4px] border-[#B41203]" : ""
        }`}
      >
        <div
          className={`
        ${keyFocused ? "key-focused" : ""}
        flex 
        justify-between 
        items-center 
        px-4 
        rounded-[12px] 
        cursor-pointer 
        scroll-m-3
        border-[1px]
        border-[#626266]
        ${
          keyFocused
            ? "bg-[#3a3a3d] shadow-[0px_4px_8px_rgba(0,0,0,0.29)]"
            : "bg-[#29292a] "
        }
        hover:bg-[#3a3a3d] 
        hover:shadow-[0px_4px_8px_rgba(0,0,0,0.29)]
        `}
          data-item-id={id}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex gap-4">
            <div className="w-[1.6em] py-3">
              <AutoHeightImage src={getItemImageSource(id)} alt="" />
            </div>
            <div className="py-3 text-sm xs:text-base flex-center">
              <span className={isActive ? "text-white" : "text-[#c2c2c2]"}>
                {name}
              </span>
            </div>
          </div>
          <IconWrapper
            className={`text-[1.2em] text-[#626265] ${
              isActive ? "text-white" : ""
            }`}
          >
            {keyFocused ? <VisualEnterKey /> : <MdKeyboardArrowRight />}
          </IconWrapper>
        </div>
      </div>
    </Link>
  );
}
