import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const siteReportFilterState = atom({
  key: "siteReportFilterState",
  default: {
    bubdong: {
      value: "",
      text: "전국",
    },
    bclass: "",
    bthema: "",
    min_price: "",
    max_price: "",
  },
  effects_UNSTABLE: [persistAtom],
});
