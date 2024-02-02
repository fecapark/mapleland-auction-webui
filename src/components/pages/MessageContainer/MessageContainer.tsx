"use client";

import { APIMessageData, getItemMessageData } from "@/server/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiscordMessage from "./DiscordMessage";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { MdChat } from "react-icons/md";
import Loader from "@/components/utils/Loader/Loader";

interface Props {
  itemId: string;
}

export default function MessageContainer({ itemId }: Props) {
  const { ref, inView } = useInView();

  const {
    data: messageData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<APIMessageData | null, unknown>({
    queryKey: ["messages", itemId],
    queryFn: ({ pageParam = 0 }) => {
      return getItemMessageData(itemId, pageParam as number);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.message_batch_index + 1;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60 * 2, // 2시간 동안은 데이터 신뢰 보장
    initialData: undefined,
  });

  const isMessageDataLoading = isLoading || messageData === undefined;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="w-full flex flex-col mt-6 card-border bg-[#1F1F22] mb-[120px]">
      <div className="px-6 xs:px-8 py-4 flex flex-col">
        <div className="flex items-center mb-1">
          <IconWrapper className="text-lg mr-2">
            <MdChat />
          </IconWrapper>
          <span>거래 메시지</span>
        </div>
        <div className="text-[#a0a0a0] text-xs xs:text-sm">
          <span>메시지를 클릭하면 거래 게시판의 해당 메시지로 이동해요.</span>
        </div>
      </div>
      {isMessageDataLoading ? (
        <div className="py-4">
          <Loader />
        </div>
      ) : messageData.pages ? (
        messageData.pages.map((page) => {
          if (page === null) return null;
          return page.messages.map((message) => (
            <DiscordMessage key={message.message_id} message={message} />
          ));
        })
      ) : null}
      <div className="my-8">
        {isFetchingNextPage ? <Loader /> : <div ref={ref} />}
      </div>
    </div>
  );
}
