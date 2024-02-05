import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import {
  itemPriceNavigatorSectionAtom,
  platformPriceNavigatorSectionAtom,
} from "@/shared/atoms";
import { useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import { useRecoilState } from "recoil";

function NavItem({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-lg px-4 xs:px-8 py-2 xs:py-3 ${
        selected
          ? "bg-[#202022] cursor-default"
          : "hover:bg-[#6a6a6c] cursor-pointer text-[#a0a0a0]"
      }`}
      data-section-selected={selected}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function SmallNavItem({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex-center rounded-lg px-4 py-2 ${
        selected
          ? "bg-[#202022] cursor-default"
          : "hover:bg-[#6a6a6c] cursor-pointer text-[#a0a0a0]"
      }`}
      data-section-selected={selected}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default function ItemPriceNavigator({}) {
  const [section, setSection] = useRecoilState(itemPriceNavigatorSectionAtom);
  const [platformSection, setPlatformSection] = useRecoilState(
    platformPriceNavigatorSectionAtom
  );

  useEffect(() => {
    return () => {
      setSection("overview");
    };
  }, [setSection]);

  useEffect(() => {
    return () => {
      setPlatformSection("discord");
    };
  }, [setPlatformSection]);

  return (
    <div className="flex-center flex-col">
      <div className="bg-[#424244] p-1 flex rounded-lg mb-4">
        <SmallNavItem
          onClick={() => setPlatformSection("discord")}
          selected={platformSection === "discord"}
        >
          <IconWrapper className="text-xl">
            <FaDiscord />
          </IconWrapper>
        </SmallNavItem>
        <SmallNavItem
          onClick={() => setPlatformSection("gg")}
          selected={platformSection === "gg"}
        >
          <div className="leading-[1.1] font-bold text-base tracking-tight">
            .GG
          </div>
        </SmallNavItem>
      </div>
      <div className="flex rounded-xl bg-[#424244] gap-1 p-1 text-sm">
        <NavItem
          text="종합 시세"
          selected={section === "overview"}
          onClick={() => setSection("overview")}
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
