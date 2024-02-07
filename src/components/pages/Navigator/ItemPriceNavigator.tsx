import SepartedInfo from "@/components/modals/contents/SeparatedInfo";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import useModal from "@/hooks/useModal";
import {
  itemPriceNavigatorSectionAtom,
  platformPriceNavigatorSectionAtom,
  xsMediaMatchedAtom,
} from "@/shared/atoms";
import { use, useEffect } from "react";
import { MdInfoOutline, MdWarning } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";

function NavItem({
  text,
  selected,
  onClick,
  disable = false,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
  disable?: boolean;
}) {
  const { isXS } = useRecoilValue(xsMediaMatchedAtom);

  const setModal = useModal({
    title: "종합 시세가 표시되지 않아요",
    content: <SepartedInfo />,
  });

  return (
    <div
      className={`rounded-lg ${
        disable ? "px-4 xs:pr-4 xs:pl-8 py-0" : "px-4 xs:px-8 py-2 xs:py-3"
      } flex-center gap-2 ${
        selected
          ? "bg-[#202022] cursor-default"
          : `${
              disable ? "cursor-default" : "hover:bg-[#6a6a6c] cursor-pointer"
            }  text-[#a0a0a0]`
      }`}
      data-section-selected={selected}
      onClick={onClick}
    >
      {isXS && disable ? null : <span>{text}</span>}

      {disable ? (
        <div
          className="w-8 h-8 flex-center cursor-pointer hover:bg-[#2a2a2c] rounded-[50%]"
          onClick={() => setModal(true)}
        >
          <IconWrapper className="text-xl text-[#b2b2b4]">
            <MdInfoOutline />
          </IconWrapper>
        </div>
      ) : null}
    </div>
  );
}

export default function ItemPriceNavigator({
  disableOverview = false,
}: {
  disableOverview?: boolean;
}) {
  const [section, setSection] = useRecoilState(itemPriceNavigatorSectionAtom);

  useEffect(() => {
    setSection((prev) => {
      if (disableOverview && prev === "overview") return "seller";
      return prev;
    });
  }, [disableOverview, setSection]);

  useEffect(() => {
    return () => {
      setSection("overview");
    };
  }, [setSection]);

  return (
    <div className="flex-center flex-col">
      <div className="flex rounded-xl bg-[#424244] gap-1 p-1 text-sm">
        <NavItem
          text="종합 시세"
          selected={section === "overview"}
          onClick={() => {
            setSection((prev) => {
              if (disableOverview) return prev;
              return "overview";
            });
          }}
          disable={disableOverview}
        />
        <NavItem
          text="판매자 시세"
          selected={section === "seller"}
          onClick={() => setSection("seller")}
        />
        <NavItem
          text="구매자 시세"
          selected={section === "buyer"}
          onClick={() => setSection("buyer")}
        />
      </div>
    </div>
  );
}
