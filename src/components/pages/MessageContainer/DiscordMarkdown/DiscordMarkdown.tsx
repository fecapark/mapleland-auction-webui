import Convert from "ansi-to-html";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Inconsolata } from "next/font/google";
import React from "react";
import DiscordEmoji from "./DiscordEmoji";

const inconsolata = Inconsolata({ subsets: ["latin"] });
const convertToAnsi = new Convert();

function extractImgFromChildren(children: React.ReactNode) {
  const imgRegex = /<:.*?:(\d+)>/;

  return React.Children.map(children, (child) => {
    if (typeof child !== "string") return child;

    let leftString = child.toString();
    const newChildren = [];

    while (true) {
      const match = imgRegex.exec(leftString);

      if (!match) {
        newChildren.push(<span>{leftString}</span>);
        break;
      }

      const [img, imgId] = match;

      newChildren.push(<span>{leftString.slice(0, match.index)}</span>);
      newChildren.push(<DiscordEmoji id={imgId} />);

      leftString = leftString.slice(match.index + img.length);
    }

    return newChildren;
  });
}

export default function DiscordMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm as any]}
      components={{
        code({ children }) {
          if (!children) return null;

          children = children?.toString().trim();

          if (children === "") return null;

          children = children.toString().replaceAll(/\n\n/gi, "\n");
          children = children.toString().replace(/\n$/, "");
          children = convertToAnsi.toHtml(children.toString()); // ansi

          return (
            <div
              style={{
                background: "#242428",
                border: "1px solid #16161a",
                padding: "12px 8px",
                borderRadius: "8px",
                marginTop: "1px",
                marginBottom: "1em",
              }}
            >
              <code
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "0.875rem",
                }}
                dangerouslySetInnerHTML={{ __html: children }}
              ></code>
            </div>
          );
        },
        // 인용문 (>)
        blockquote({ children, ...props }) {
          if (children?.toString().trim() === "") return null;

          return (
            <div>
              <blockquote
                {...props}
                style={{
                  display: "inline-block",
                  background: "#141418",
                  padding: "1px 4px",
                  borderRadius: "4px",
                  marginBottom: "4px",
                }}
                className={inconsolata.className}
              >
                {children}
              </blockquote>
            </div>
          );
        },
        em({ children, ...props }) {
          return (
            <span
              style={{ fontStyle: "italic", wordBreak: "break-word" }}
              {...props}
            >
              {children}
            </span>
          );
        },
        p: ({ children, ...props }) => {
          return (
            <p style={{ wordBreak: "break-word" }} {...props}>
              {extractImgFromChildren(children)}
            </p>
          );
        },
        h1: ({ children, ...props }) => {
          return (
            <h1
              style={{ wordBreak: "break-word" }}
              className="my-2 font-bold text-2xl"
              {...props}
            >
              {extractImgFromChildren(children)}
            </h1>
          );
        },
        h2: ({ children, ...props }) => {
          return (
            <h2
              style={{ wordBreak: "break-word" }}
              className="mt-4 mb-2 font-bold text-xl"
              {...props}
            >
              {extractImgFromChildren(children)}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          return (
            <h3
              style={{ wordBreak: "break-word" }}
              className="mt-4 mb-2 font-bold"
              {...props}
            >
              {extractImgFromChildren(children)}
            </h3>
          );
        },
      }}
    >
      {content
        .replace(/\n/gi, "\n\n")
        .replace(/<\/?u>/gi, "*")
        .replaceAll(/.*?```/gi, "\n```")
        .replaceAll(/```(?!ansi|diff)[^ ]*/gi, "```\n")
        .replaceAll(/[^\S\n]\*\*/gi, "**")}
    </ReactMarkdown>
  );
}
