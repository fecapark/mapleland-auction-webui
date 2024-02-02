import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import SearchContainer from "../Search/SearchContainer";
import Link from "next/link";

export default function ImbedHeader() {
  return (
    <header className="px-4 py-2 w-full flex justify-between items-center">
      <Link href="/">
        <div className="w-[120px] xs:w-[180px]">
          <AutoHeightImage src={`/logo.png`} alt="" />
        </div>
      </Link>
      <div>
        <SearchContainer embedded={true} />
      </div>
    </header>
  );
}
