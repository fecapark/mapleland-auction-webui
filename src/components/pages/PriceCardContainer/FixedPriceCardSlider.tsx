import {
  itemPriceNavigatorSectionAtom,
  xsMediaMatchedAtom,
} from "@/shared/atoms";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

export default function FixedPriceCardSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isXS } = useRecoilValue(xsMediaMatchedAtom);
  const frameRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const onSlideEnd = useCallback(() => {
    const { current } = sliderRef;
    if (!current) return;

    const { firstElementChild } = current;

    if (!firstElementChild) return;

    current.style.transition = "none";
    current.appendChild(firstElementChild.cloneNode(true));
    firstElementChild.remove();

    requestAnimationFrame(() => {
      current.style.transition = "";
      current.style.transform = "translate3d(0, 0px, 0)";
    });
  }, [sliderRef]);

  const slide = useCallback(() => {
    const { current } = sliderRef;
    if (!current) return;

    const { firstElementChild } = current;
    if (!firstElementChild) return;

    const { height } = firstElementChild.getBoundingClientRect();

    requestAnimationFrame(() => {
      current.style.transition = "transform 0.5s cubic-bezier(0.2, 0, 0, 1)";
      current.style.transform = `translate3d(0, -${height}px, 0)`;
    });
  }, [sliderRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      slide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [onSlideEnd, slide]);

  useEffect(() => {
    if (!frameRef.current) return;
    if (!sliderRef.current) return;

    const { firstElementChild } = sliderRef.current;
    if (!firstElementChild) return;

    let width = 0,
      height = Infinity;

    // 올바른 너비를 구하기 위한 트릭
    frameRef.current.style.width = "230px";

    requestAnimationFrame(() => {
      Array.from(sliderRef.current!.children).forEach((child) => {
        const { width: childWidth, height: childHeight } =
          child.getBoundingClientRect();
        width = Math.max(width, childWidth + 4);
        height = Math.min(height, childHeight);
      });

      frameRef.current!.style.width = `${width}px`;
      frameRef.current!.style.height = `${height}px`;
    });
  }, [isXS, frameRef, sliderRef]);

  return (
    <div
      className="relative overflow-hidden card-border card-bg"
      ref={frameRef}
    >
      <div
        className="slider absolute top-0"
        ref={sliderRef}
        onTransitionEnd={onSlideEnd}
      >
        {children}
      </div>
    </div>
  );
}
