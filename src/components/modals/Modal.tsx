"use client";

import { isModalActiveAtom, modalContentAtom } from "@/shared/atoms";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Modal() {
  const [isModalActive, setIsModalActive] = useRecoilState(isModalActiveAtom);
  const modalContent = useRecoilValue(modalContentAtom);

  const closeModal = useCallback(() => {
    setIsModalActive(false);
  }, [setIsModalActive]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (!isModalActive) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isModalActive, closeModal]);

  return (
    <div
      className={`p-4 fixed top-0 left-0 w-full h-full z-[1000000] flex-center ${
        isModalActive ? "" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-blur-[4px] bg-[#00000077]"
        onClick={closeModal}
      ></div>
      <div
        className={`
        text-[#e2e2e5] 
        py-6 
        px-5 
        w-[400px] 
        max-h-[500px]
        xs:max-h-[90vh] 
        overflow-y-auto 
        scrollbar-thin
        scrollbar-thumb-rounded
        scrollbar-thumb-[#626265]
        scrollbar-track-transparent 
        card-border 
        card-bg 
        z-[10000000] 
        backdrop-blur-2
        `}
      >
        <div className="mb-3">
          <span className="font-medium text-lg">{modalContent?.title}</span>
        </div>
        <div className="text-sm">{modalContent?.content}</div>
      </div>
    </div>
  );
}
