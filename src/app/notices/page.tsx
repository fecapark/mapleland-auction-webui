import ImbedHeader from "@/components/pages/ImbedHeader/ImbedHeader";
import { allNoticePosts } from "@/../.contentlayer/generated";
import Link from "next/link";
import { compareDesc } from "date-fns";

function UpdateCard({
  index,
  title,
  datestr,
  description,
  url,
}: {
  index: number;
  title: string;
  datestr: string;
  description: string;
  url: string;
}) {
  const getDateString = () => {
    const date = new Date(datestr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month < 10 ? "0" : ""}${month}.${
      day < 10 ? "0" : ""
    }${day}`;
  };

  return (
    <Link href={url}>
      <div className="w-full flex flex-col card-border card-bg hover:bg-[#28282a] px-6 xs:px-8 py-4 xs:py-6 cursor-pointer">
        <div className="mb-2 flex flex-col items-start">
          <span className="font-medium text-sm xs:text-base text-[#d2d2d6] card-border px-3 py-1 mb-3">
            {getDateString()}
          </span>
          <span className="font-bold text-xl xs:text-2xl mr-4">
            <span className="mr-2 text-[#2D7CEB]">#{index}</span>
            <span className="">{title}</span>
          </span>
        </div>
        <div>
          <span className="text-[#b2b2b5] text-sm xs:text-base">
            {description}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Updates() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center">
      <ImbedHeader />
      <div className="max-w-[930px] w-full px-6 xs:px-[35px] pt-[20px] xs:pt-[40px] flex flex-col">
        <div className="text-3xl xs:text-4xl font-bold mb-8 xs:mb-10">
          공지사항
        </div>
        <div className="w-full flex flex-col gap-6">
          {allNoticePosts
            .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
            .slice(0, -1)
            .map((post) => (
              <UpdateCard
                key={post._id}
                url={post.url}
                index={post.index}
                title={post.title}
                datestr={post.date}
                description={post.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
