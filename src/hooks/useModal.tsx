import { useSetRecoilState } from "recoil";
import { IModalContent } from "../shared/types";
import { isModalActiveAtom, modalContentAtom } from "@/shared/atoms";

export default function useModal(content: IModalContent) {
  const setIsModalActive = useSetRecoilState(isModalActiveAtom);
  const setModalContent = useSetRecoilState(modalContentAtom);

  const setThisModal = (state: boolean) => {
    setIsModalActive(state);
    setModalContent(content);
  };

  return setThisModal;
}
