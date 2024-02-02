import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { FaDiscord } from "react-icons/fa";

function getHashNumber(str: string) {
  let hash = 0;
  let chr;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default function DiscordProfile({ username }: { username: string }) {
  const userHash = getHashNumber(username);
  const profileColors = [
    "#5D6AF3",
    "#43A861",
    "#EE4A4C",
    "#FAA928",
    "#757E8A",
    "#EB469F",
  ];
  const userProfileIndex = userHash % profileColors.length;

  return (
    <div
      className="rounded-[50%] w-[40px] h-[40px] flex-center"
      style={{ backgroundColor: profileColors[userProfileIndex] }}
    >
      <IconWrapper className="text-[26px]">
        <FaDiscord />
      </IconWrapper>
    </div>
  );
}
