import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const moveInFilterState = atom({
  key: "moveInFilterState",
  default: {
    bubdong: {
      value: "",
      text: "전국",
    },
    bclass: "",
    mvi_ymd: "",
  },
  effects_UNSTABLE: [persistAtom],
});
