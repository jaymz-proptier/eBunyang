import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const developFilterState = atom({
  key: "developFilterState",
  default: {
    bubdong: {
      value: "",
      text: "전국",
    },
    biz_type_cd: "",
    biz_step_cd: "",
  },
  effects_UNSTABLE: [persistAtom],
});
