import SearchBar from "./SearchBar/SearchBar";

export default function FixedSearchContainer({
  focused,
}: {
  focused: boolean;
}) {
  return (
    <div className="z-[1000] fixed w-full h-full top-0 left-0 pt-4 px-4 xs:p-8 backdrop-blur-md bg-[#00000044]">
      <center>
        <div className="search-container relative max-w-[600px]">
          <SearchBar focused={focused} isEmbedded={false} />
        </div>
      </center>
    </div>
  );
}
