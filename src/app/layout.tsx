import type { Metadata } from "next";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecoilRootProvider from "@/components/providers/RecoilRootProvider/RecoilRootProvider";
import TanstackProvider from "@/components/providers/TanstackProvider/TanstackProvider";
import MediaQueryDetector from "@/components/providers/MediaQueryDetector/MediaQueryDetector";
import Modal from "@/components/modals/Modal";
import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "메이플랜드 옥션",
  description: "메이플랜드 아이템들의 실시간 시세를 검색해보세요.",
};

const NotoSansKR = Noto_Sans_KR({ subsets: ["latin"] });
const Pretendard = localFont({
  src: [
    {
      path: "fonts/Pretendard/Pretendard-Thin.otf",
      weight: "100",
    },
    {
      path: "/fonts/Pretendard/Pretendard-ExtraLight.otf",
      weight: "200",
    },
    {
      path: "fonts/Pretendard/Pretendard-Light.otf",
      weight: "300",
    },
    {
      path: "fonts/Pretendard/Pretendard-Regular.otf",
      weight: "400",
    },
    {
      path: "fonts/Pretendard/Pretendard-Medium.otf",
      weight: "500",
    },
    {
      path: "fonts/Pretendard/Pretendard-SemiBold.otf",
      weight: "600",
    },
    {
      path: "fonts/Pretendard/Pretendard-Bold.otf",
      weight: "700",
    },
    {
      path: "fonts/Pretendard/Pretendard-ExtraBold.otf",
      weight: "800",
    },
    {
      path: "fonts/Pretendard/Pretendard-Black.otf",
      weight: "900",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_adsKey}`}
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-adsense-account"
          content={`ca-pub-${process.env.NEXT_PUBLIC_adsKey}`}
        ></meta>
      </head>
      <body className={`${Pretendard.className} ${NotoSansKR.className}`}>
        <TanstackProvider>
          <RecoilRootProvider>
            <MediaQueryDetector />
            <Modal />
            {children}
            <Footer />
          </RecoilRootProvider>
        </TanstackProvider>
        <Analytics />
      </body>
    </html>
  );
}
