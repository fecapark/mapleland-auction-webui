"use client";

import { allNoticePosts } from "contentlayer/generated";
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
import { useRouter } from "next/navigation";

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
};

export const generatedStaticParams = async () => {
  allNoticePosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generatedMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allNoticePosts.find(
    (post) => post._raw.flattenedPath === params.slug
  );
  if (!post) notFound();
};

export default function UpdatePage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const post = allNoticePosts.find(
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
        <div
          className="mb-[60px] card-border card-bg pl-4 pr-6 py-2 xs:py-3 inline-flex items-center gap-2 hover:bg-[#28282a] cursor-pointer"
          onClick={() => router.back()}
        >
          <IconWrapper className="text-lg">
            <MdArrowBack />
          </IconWrapper>
          <span className="text-sm xs:text-base font-semibold">돌아가기</span>
        </div>
        <H1>{post.title}</H1>
        <div className="text-lg xs:text-xl mt-3 text-[#b2b2b5] font-semibold mb-[60px]">
          공지사항 <span className="mx-2">·</span> {getDateString(post.date)} 에
          작성됨
        </div>
        <div className="text-lg ">
          <MDXContent components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
