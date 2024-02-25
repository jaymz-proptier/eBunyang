import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const itemClicked = atom({
  key: "itemClicked",
  default: [],
});

export const bubdongState = atom({
  key: "bubdongState",
  default: {
    value: "",
    text: "전국",
    sido: "",
    gugun: "",
    lat: "",
    lng: "",
    zoom: 18,
  },
  effects_UNSTABLE: [persistAtom],
});

export const bunyangFilterState = atom({
  key: "bunyangFilterState",
  default: {
    bubdong: {
      value: "",
      text: "전국",
      sido: "",
      gugun: "",
      lat: "",
      lng: "",
      zoom: 18,
    },
    bclass: "",
    supp_proc_step: "",
    supp_sclass: "",
    bthema: "",
    schdl_cd: "",
    min_price: "",
    max_price: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const bclassState = atom({
  key: "bclassState",
  default: {
    value: [],
    text: ["분양유형 전체"],
  },
});

export const maxPriceState = atom({
  key: "maxPriceState",
  default: 180000,
});

export const minPriceState = atom({
  key: "minPriceState",
  default: 0,
});

export const bunyangFilterSelector = selector({
  key: "bunyangFilterSelector",
  get: ({ get }) => {
    const bclass = get(bclassState);
    const maxPrice = get(maxPriceState);
    const minPrice = get(minPriceState);

    return {
      bclass,
      max_price: maxPrice,
      min_price: minPrice,
    };
  },
});

export const addBclass = (newBclass) => {
  return (bclass) => {
    const newBclassValue = [...bclass.value, newBclass.value];
    const newBclassText =
      bclass.text[0] === "분양유형 전체"
        ? [newBclass.text]
        : [...bclass.text, newBclass.text];

    return {
      ...bclass,
      value: newBclassValue,
      text: newBclassText,
    };
  };
};

export const removeBclass = (valueToRemove) => {
  return (bclass) => {
    const newBclassValue = bclass.value.filter((o) => o !== valueToRemove);
    const newBclassText =
      bclass.text.filter((o) => o !== valueToRemove).length === 0
        ? ["분양유형 전체"]
        : bclass.text.filter((o) => o !== valueToRemove);

    return {
      ...bclass,
      value: newBclassValue,
      text: newBclassText,
    };
  };
};

export const mapAreaCodeAtom = atom({
  key: "mapAreaCode",
  default: {
    value: "",
    sido: "시/도",
    gugun: "시/군/구",
    dong: "읍/면/동",
  },
  effects_UNSTABLE: [persistAtom],
});

export const bunyangMapMarkerTypeAtom = atom({
  key: "bunyangMapMarkerType",
  default: "분양유형",
  effects_UNSTABLE: [persistAtom],
});


const SYtoday = new Date();
export const bunyangSchduleDateAtom = atom({
  key: "bunyangSchduleDate",
  default: SYtoday.getFullYear() + "" + ("0" + (SYtoday.getMonth() + 1)).slice(-2) + "" + ("0" + SYtoday.getDate()).slice(-2),
  effects_UNSTABLE: [persistAtom],
});

export const bunyangPositionAtom = atom({
  key: "bunyangPosition",
  default: localStorage.getItem("SYposition")
    ? JSON.parse(localStorage.getItem("SYposition"))
    : { lat: "", lng: "", zoom: 18 },
  effects_UNSTABLE: [persistAtom],
});
