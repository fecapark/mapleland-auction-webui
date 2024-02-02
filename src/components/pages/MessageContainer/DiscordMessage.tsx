import { ItemMessageData } from "@/server/actions";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import DiscordProfile from "./DiscordProfile";
import DiscordMarkdown from "./DiscordMarkdown/DiscordMarkdown";
import { Noto_Sans_KR } from "next/font/google";

interface Props {
  message: ItemMessageData;
}

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

function parseTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const isPM = date.getHours() >= 12;
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();

  return `${year}.${month < 10 ? "0" : ""}${month}.${day} ${
    isPM ? "오후" : "오전"
  } ${hour}:${minute < 10 ? "0" : ""}${minute}`;
}

export default function DiscordMessage({ message }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={`https://discord.com/channels/1134059900666916935/${message.channel_id}/${message.message_id}`}
    >
      <div
        className={`relative mt-2 xs:mt-5 flex hover:bg-[#00000011] px-3 xs:px-8 py-2 cursor-pointer ${NotoSansKR.className}`}
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}
      >
        <div className="absolute top-2 right-4 bg-[#18181a]">
          <div
            className={`text-xs px-2 py-1 text-[#d2d2d5] ${
              isHover ? "" : "hidden"
            }`}
          >
            이동하기
          </div>
        </div>
        <div className="mr-3">
          <DiscordProfile username={message.username} />
        </div>
        <div className="w-full">
          <div className="flex items-end mb-2">
            <span className="font-medium mr-2 leading-[1]">
              {message.username}
            </span>
            <span className="text-[#8C939B] text-xs leading-[1]">
              {parseTimestamp(message.timestamp)}
            </span>
          </div>
          <div className="w-full overflow-hidden text-[#D2D5D9] text-[15px] leading-[1.375rem]">
            <DiscordMarkdown content={message.full_text} />
          </div>
        </div>
      </div>
    </Link>
  );
}
