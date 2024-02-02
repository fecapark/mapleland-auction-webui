import { useEffect, useState } from "react";

export default function useMediaQuery(media: string): [boolean, boolean] {
  const [setted, setSetted] = useState(false);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const isMatch = window.matchMedia(media).matches;
      setMatched(isMatch);
    };

    window.addEventListener("resize", onResize);
    onResize();
    setSetted(true);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [media]);

  return [matched, setted];
}
