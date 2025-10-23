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
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "메이플랜드 옥션",
  description:
    "메랜 옥션 | 메이플랜드 아이템들의 현재 시세 및 거래가를 검색해보세요.",
};

const NotoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const Pretendard = localFont({
  src: [
    {
      path: "fonts/Pretendard/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "fonts/Pretendard/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "fonts/Pretendard/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "fonts/Pretendard/Pretendard-Bold.subset.woff2",
      weight: "700",
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4853769564458459"
     crossorigin="anonymous"></script>
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-5067810809862075?ers=1"
          nonce="jVOU16m7cqDWJOhCBSesPg"
        ></script>
        <Script id="anti-adblock" nonce="jVOU16m7cqDWJOhCBSesPg">
          {`
            (function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();
            `}
        </Script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ETRZF8H0P3"
        ></Script>
        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ETRZF8H0P3');
          `,
          }}
        ></Script>
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
      <GoogleTagManager gtmId="GTM-M4582KFM" />
    </html>
  );
}
