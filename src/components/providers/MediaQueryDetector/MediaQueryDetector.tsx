"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { xsMediaMatchedAtom } from "@/shared/atoms";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function MediaQueryDetector() {
  const [xsMatched, xsSetted] = useMediaQuery("screen and (max-width: 480px)");
  const setXsMediaMatched = useSetRecoilState(xsMediaMatchedAtom);

  useEffect(() => {
    if (!xsSetted) return;
    setXsMediaMatched({
      isXS: xsMatched,
      loading: false,
    });
  }, [xsMatched, xsSetted, setXsMediaMatched]);

  return null;
}
