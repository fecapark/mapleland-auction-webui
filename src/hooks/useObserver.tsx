"use client";

import { useEffect } from "react";

interface Props {
  target: React.RefObject<HTMLDivElement>;
  onIntersect: IntersectionObserverCallback;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  target, // 감지할 대상, ref를 넘길 예정
  onIntersect, // 감지 시 실행할 callback 함수
  rootMargin = "0px", // root와 target이 감지하는 여백의 거리
  threshold = 1.0, // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
}: Props) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
    if (target && target.current) {
      // callback의 인자로 들어오는 entry는 기본적으로 순환자이기 때문에
      // 복잡한 로직을 필요로 할때가 많다.
      // callback을 선언하는 곳에서 로직을 짜서 통째로 넘기도록 하겠다.
      observer = new IntersectionObserver(onIntersect, {
        rootMargin,
        threshold,
      });
      // 실제 Element가 들어있는 current 관측을 시작한다.
      observer.observe(target.current);
    }

    // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자.
    return () => observer && observer.disconnect();
  }, [target, onIntersect, rootMargin, threshold]);
};
