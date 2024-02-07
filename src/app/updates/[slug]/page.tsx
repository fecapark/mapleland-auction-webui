import { allUpdatePosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import ImbedHeader from "@/components/pages/ImbedHeader/ImbedHeader";
import { H1, H2, H3 } from "@/components/MD/heading";
import AutoHeightImage from "@/components/utils/AutoHeightImage/AutoHeightImage";
import "github-markdown-css";
import { TD, TR, Table } from "@/components/MD/table";
import { IconWrapper } from "@/components/utils/IconWrapper/IconWrapper";
import { MdArrowBack } from "react-icons/md";
import PostBackButton from "@/components/pages/PostBackButton/PostBackButton";
import { LI, UL } from "@/components/MD/list";

const mdxComponents: MDXComponents = {
  a: ({
    href,
    children,
  }: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <Link href={href as string} target="_blank" rel="noopener noreferrer">
      <span className="text-[#2D7CEB] hover:underline">{children}</span>
    </Link>
  ),
  img: ({ src, alt, width }) => (
    <div style={{ width }}>
      <AutoHeightImage src={src ?? "#"} alt={alt ?? ""} />
    </div>
  ),
  table: ({ children }) => <Table>{children}</Table>,
  tr: ({ children }) => <TR>{children}</TR>,
  td: ({ children }) => <TD>{children}</TD>,
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  ul: ({ children }) => <UL>{children}</UL>,
  li: ({ children }) => <LI>{children}</LI>,
};

export const generateStaticParams = async () => {
  return allUpdatePosts.map((post) => ({
    slug: post._raw.flattenedPath.split("/")[2],
  }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allUpdatePosts.find(
    (post) =>
      post._raw.flattenedPath === `${post._raw.sourceFileDir}/${params.slug}`
  );
  if (!post) notFound();
  return post;
};

export default function UpdatePage({ params }: { params: { slug: string } }) {
  const post = allUpdatePosts.find(
    (post) =>
      post._raw.flattenedPath === `${post._raw.sourceFileDir}/${params.slug}`
  );

  const MDXContent = useMDXComponent(post === undefined ? "" : post.body.code);
  if (!post) notFound();

  const getDateString = (datestr: string) => {
    const date = new Date(datestr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month < 10 ? "0" : ""}${month}.${
      day < 10 ? "0" : ""
    }${day}`;
  };

  return (
    <article className="w-full flex flex-col items-center">
      <ImbedHeader />
      <div className="max-w-[930px] min-h-[80vh] w-full pt-4 xs:pt-[40px] px-6 xs:px-[35px]">
        <PostBackButton />
        <H1>{post.title}</H1>
        <div className="text-lg xs:text-xl mt-3 text-[#b2b2b5] font-semibold mb-[60px]">
          업데이트 <span className="mx-2">·</span> {getDateString(post.date)} 에
          작성됨
        </div>
        <div className="text-lg ">
          <MDXContent components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
