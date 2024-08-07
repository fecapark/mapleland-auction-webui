import { atom } from "recoil";
import { IModalContent } from "./types";

export const serachResultCountAtom = atom<number>({
  key: "searchResultCount",
  default: 0,
});

export const xsMediaMatchedAtom = atom<{ isXS: boolean; loading: boolean }>({
  key: "xsMediaMatched",
  default: { isXS: false, loading: true },
});

export const itemPriceNavigatorSectionAtom = atom<
  "seller" | "buyer" | "overview"
>({
  key: "itemPriceNavigatorSection",
  default: "overview",
});

export const platformPriceNavigatorSectionAtom = atom<"discord" | "gg">({
  key: "platformPriceNavigatorSection",
  default: "discord",
});

export const isModalActiveAtom = atom<boolean>({
  key: "isModalActive",
  default: false,
});

export const modalContentAtom = atom<IModalContent | null>({
  key: "modalContent",
  default: null,
});

export const chartTickValueAtom = atom<"day" | "hour">({
  key: "chartTickValues",
  default: "day",
});
