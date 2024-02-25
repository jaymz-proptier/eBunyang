import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const aptFilterState = atom({
  key: "aptFilterState",
  default: {
    bubdong: {
      value: "",
      text: "전국",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
