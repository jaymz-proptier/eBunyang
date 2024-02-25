import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SYkoreanPrice } from "../../hooks";

import {
  SYbclassFilter,
  SYpriceFilter,
  SYstepFilter,
  SYsuppFilter,
  SYbthemaFilter,
  SYschdlFilter,
  SYhouseCntFilter,
  SYscaleFilter,
  SYregionFilter,
} from "../../components/filter";

import { useRecoilState, useResetRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

function SYfilterComponents() {
  const [SYfilterMenu, SYsetFilterMenu] = useState([]);
  const [SYfilterPressed, SYsetFilterPressed] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const bclass = searchParams.get("bclass") || "";
  const supp_proc_step = searchParams.get("supp_proc_step") || "";
  const supp_sclass = searchParams.get("supp_sclass") || "";
  const bthema = searchParams.get("bthema") || "";
  const schdl_cd = searchParams.get("schdl_cd") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";
  const min_house_cnt = searchParams.get("min_house_cnt") || "";
  const max_house_cnt = searchParams.get("max_house_cnt") || "";
  const min_scale = searchParams.get("min_scale") || "";
  const max_scale = searchParams.get("max_scale") || "";
  const [SYfilter, setSYfilter] = useRecoilState(bunyangFilterState);
  const resetFilterState = useResetRecoilState(bunyangFilterState);
  const SYmodal = useRef();

  useEffect(() => {
    if (
      bclass ||
      supp_proc_step ||
      supp_sclass ||
      bthema ||
      schdl_cd ||
      min_price ||
      max_price ||
      min_house_cnt ||
      max_house_cnt ||
      min_scale ||
      max_scale
    ) {
      setSYfilter({
        ...SYfilter,
        bclass: bclass,
        supp_proc_step: supp_proc_step,
        supp_sclass: supp_sclass,
        bthema: bthema,
        schdl_cd: schdl_cd,
        min_price: min_price,
        max_price: max_price,
        min_house_cnt: min_house_cnt,
        max_house_cnt: max_house_cnt,
        min_scale: min_scale,
        max_scale: max_scale,
      });
    }
  }, [bclass, supp_proc_step, supp_sclass, bthema, schdl_cd, min_price, max_price, min_house_cnt, max_house_cnt, min_scale, max_scale]);

  useEffect(() => {
    SYfilter.bclass
      ? searchParams.set("bclass", SYfilter.bclass)
      : searchParams.delete("bclass");
    SYfilter.supp_proc_step
      ? searchParams.set("supp_proc_step", SYfilter.supp_proc_step)
      : searchParams.delete("supp_proc_step");
    SYfilter.supp_sclass
      ? searchParams.set("supp_sclass", SYfilter.supp_sclass)
      : searchParams.delete("supp_sclass");
    SYfilter.bthema
      ? searchParams.set("bthema", SYfilter.bthema)
      : searchParams.delete("bthema");
    SYfilter.schdl_cd
      ? searchParams.set("schdl_cd", SYfilter.schdl_cd)
      : searchParams.delete("schdl_cd");
    SYfilter.min_price
      ? searchParams.set("min_price", SYfilter.min_price)
      : searchParams.delete("min_price");
    SYfilter.max_price
      ? searchParams.set("max_price", SYfilter.max_price)
      : searchParams.delete("max_price");
    SYfilter.min_house_cnt
      ? searchParams.set("min_house_cnt", SYfilter.min_house_cnt)
      : searchParams.delete("min_house_cnt");
    SYfilter.max_house_cnt
      ? searchParams.set("max_house_cnt", SYfilter.max_house_cnt)
      : searchParams.delete("max_house_cnt");
    SYfilter.min_scale
      ? searchParams.set("min_scale", SYfilter.min_scale)
      : searchParams.delete("min_scale");
    SYfilter.max_scale
      ? searchParams.set("max_scale", SYfilter.max_scale)
      : searchParams.delete("max_scale");
    setSearchParams(searchParams);
  }, [SYfilter]);

  useEffect(() => {
    console.log(bclass);
    console.log(supp_proc_step);
    SYsetFilterMenu([
      {
        column: "region",
        title: "지역",
        text: SYfilter.bubdong.text,
      },
      {
        column: "bclass",
        title: "유형",
        text: "유형 전체",
        item: [
          {
            code: "C01",
            title: "아파트",
            selected: bclass.includes("C01"),
          },
          {
            code: "C02",
            title: "오피스텔",
            selected: bclass.includes("C02"),
          },
          {
            code: "D01",
            title: "빌라/도시형",
            selected: bclass.includes("D01"),
          },
          {
            code: "H01",
            title: "상가/업무",
            selected: bclass.includes("H01"),
          },
          {
            code: "C03",
            title: "생활숙박시설",
            selected: bclass.includes("C03"),
          },
        ],
      },
      {
        column: "price",
        title: "가격",
        text: "가격 전체",
        unit: "만원",
        minValue: 0,
        maxValue: 180000,
        stepValue: 10000,
        currentMinValue: min_price,
        currentMaxValue: max_price,
        item: [
          {
            code: "0",
            title: "전체",
            marks: "0",
            selected: min_price === "" && max_price === "",
          },
          {
            code: "30000",
            title: "~3억",
            marks: "3억",
            selected: min_price === "0" && max_price === "30000",
          },
          {
            code: "60000",
            title: "~6억",
            marks: "6억",
            selected: min_price === "0" && max_price === "60000",
          },
          {
            code: "90000",
            title: "~9억",
            marks: "9억",
            selected: min_price === "0" && max_price === "90000",
          },
          {
            code: "120000",
            title: "~12억",
            marks: "12억",
            selected: min_price === "0" && max_price === "120000",
          },
          {
            code: "150000",
            title: "~15억",
            marks: "15억",
            selected: min_price === "0" && max_price === "150000",
          },
          {
            code: "180000",
            title: "18억~",
            marks: "18억",
            selected: min_price.includes("180000") && max_price === "",
          },
        ],
      },
      {
        column: "supp_proc_step",
        title: "단계",
        text: "단계 전체",
        item: [
          {
            code: "S12",
            title: "분양중",
            selected: supp_proc_step.includes("S12"),
          },
          {
            code: "S11",
            title: "청약중",
            selected: supp_proc_step.includes("S11"),
          },
          {
            code: "S01",
            title: "분양계획",
            selected: supp_proc_step.includes("S01"),
          },
          {
            code: "S13",
            title: "미분양",
            selected: supp_proc_step.includes("S13"),
          },
        ],
      },
      {
        column: "supp_sclass",
        title: "형태",
        text: "형태 전체",
        item: [
          {
            code: "PRV",
            title: "민간분양",
            selected: supp_sclass.includes("PRV"),
          },
          {
            code: "PUB",
            title: "공공분양",
            selected: supp_sclass.includes("PUB"),
          },
          {
            code: "RNT",
            title: "임대분양",
            selected: supp_sclass.includes("RNT"),
          },
          {
            code: "RCN",
            title: "재건축",
            selected: supp_sclass.includes("RCN"),
          },
          {
            code: "RDV",
            title: "재개발",
            selected: supp_sclass.includes("RDV"),
          },
          {
            code: "LOT",
            title: "추첨제",
            selected: supp_sclass.includes("LOT"),
          },
        ],
      },
      {
        column: "bthema",
        title: "테마",
        text: "테마 전체",
        item: [
          {
            code: "VID",
            title: "영상",
            selected: bthema.includes("VID"),
          },
          {
            code: "VR",
            title: "VR",
            selected: bthema.includes("VR"),
          },
          {
            code: "VST",
            title: "현장방문",
            selected: bthema.includes("VST"),
          },
          {
            code: "ISV",
            title: "옵션계산",
            selected: bthema.includes("ISV"),
          },
        ],
      },
      {
        column: "schdl_cd",
        title: "일정",
        text: "일정 전체",
        item: [
          {
            code: "101",
            title: "모집공고",
            selected: schdl_cd.includes("101"),
          },
          {
            code: "300",
            title: "특별공급",
            selected: schdl_cd.includes("300"),
          },
          {
            code: "301",
            title: "1순위",
            selected: schdl_cd.includes("301"),
          },
          {
            code: "302",
            title: "2순위",
            selected: schdl_cd.includes("302"),
          },
          {
            code: "401",
            title: "당첨자발표",
            selected: schdl_cd.includes("401"),
          },
          {
            code: "501",
            title: "계약기간",
            selected: schdl_cd.includes("501"),
          },
        ],
      },
      {
        column: "house_count",
        title: "세대수",
        text: "세대수 전체",
        unit: "세대",
        minValue: 0,
        maxValue: 1000,
        stepValue: 100,
        currentMinValue: min_house_cnt,
        currentMaxValue: max_house_cnt,
        item: [
          {
            code: "0",
            title: "전체",
            marks: "0",
            selected: min_house_cnt === "" && max_house_cnt === "",
          },
          {
            code: "200",
            title: "~200세대",
            marks: "200세대",
            selected: min_house_cnt === "0" && max_house_cnt === "200",
          },
          {
            code: "400",
            title: "~400세대",
            marks: "400세대",
            selected: min_house_cnt === "0" && max_house_cnt === "400",
          },
          {
            code: "600",
            title: "~600세대",
            marks: "600세대",
            selected: min_house_cnt === "0" && max_house_cnt === "600",
          },
          {
            code: "800",
            title: "~800세대",
            marks: "800세대",
            selected: min_house_cnt === "0" && max_house_cnt === "800",
          },
          {
            code: "1000",
            title: "1000세대~",
            marks: "1000세대",
            selected: min_house_cnt === "1000" && max_house_cnt === "",
          },
        ],
      },
      {
        column: "scale",
        title: "면적",
        text: "면적 전체",
        unit: "평",
        minValue: 0,
        maxValue: 60,
        stepValue: 1,
        currentMinValue: min_scale,
        currentMaxValue: max_scale,
        item: [
          {
            code: "0",
            title: "전체",
            marks: "0",
            selected: min_scale === "" && max_scale === "",
          },
          {
            code: "10",
            title: "~10평대",
            marks: "10평대",
            selected: min_scale === "0" && max_scale === "10",
          },
          {
            code: "20",
            title: "~20평대",
            marks: "20평대",
            selected: min_scale === "0" && max_scale === "20",
          },
          {
            code: "30",
            title: "~30평대",
            marks: "30평대",
            selected: min_scale === "0" && max_scale === "30",
          },
          {
            code: "40",
            title: "~40평대",
            marks: "40평대",
            selected: min_scale === "0" && max_scale === "40",
          },
          {
            code: "50",
            title: "~50평대",
            marks: "50평대",
            selected: min_scale === "0" && max_scale === "50",
          },
          {
            code: "60",
            title: "60평대~",
            marks: "60평대",
            selected: min_scale === "60" && max_scale === "",
          },
        ],
      },
    ]);
  }, [
    SYfilter, bclass, supp_proc_step, supp_sclass, bthema, schdl_cd, min_price, max_price, min_house_cnt, max_house_cnt, min_scale, max_scale,
  ]);

  const SYsettingFilter = {
    region: SYregionFilter,
    bclass: SYbclassFilter,
    price: SYpriceFilter,
    supp_proc_step: SYstepFilter,
    supp_sclass: SYsuppFilter,
    bthema: SYbthemaFilter,
    schdl_cd: SYschdlFilter,
    house_count: SYhouseCntFilter,
    scale: SYscaleFilter,
  };

  const SYfilterComponentCreate = (SYdata, SYindex) => {
    const SYcomponentName = SYsettingFilter[SYdata.column];
    return (
      <SYcomponentName
        key={SYindex}
        SYareaCode={bubdong_code}
        SYfilterMenu={SYdata}
        SYsetFilterPressed={SYsetFilterPressed}
      />
    );
  };

  function SYfilterText(SYdata) {
    const minValue = parseInt(SYdata.currentMinValue);
    const maxValue = parseInt(SYdata.currentMaxValue);
    let text = "";

    if (minValue === 0 && maxValue > 0) {
      text = "~" + SYkoreanPrice({ price: maxValue, unit: SYdata.unit });
    } else if (minValue > 0 && maxValue > 0) {
      text =
        SYkoreanPrice({ price: minValue, unit: SYdata.unit }) +
        "~" +
        SYkoreanPrice({ price: maxValue, unit: SYdata.unit });
    } else if (minValue > 0 && !maxValue) {
      text = SYkoreanPrice({ price: minValue, unit: SYdata.unit }) + "이상";
    }

    switch (SYdata.column) {
      case "price":
        return text ? text : SYdata.text;

      case "house_count":
        return text ? text : SYdata.text;

      case "scale":
        return text ? text : SYdata.text;

      default:
        return Array.isArray(SYdata["item"])
          ? SYdata["item"].filter((item) => item.selected === true).length > 0
            ? SYdata["item"]
                .filter((item) => item.selected === true)
                .map((item, i) => item.title)
                .join(",")
            : SYdata.text
          : SYdata.text;
    }
  }

  function SYfilterSelect(SYdata) {
    switch (SYdata.column) {
      case "price":
      case "house_count":
      case "scale":
        return Boolean(SYdata.currentMinValue || SYdata.currentMaxValue);

      default:
        return (
          Array.isArray(SYdata.item) &&
          SYdata.item.some((item) => item.selected)
        );
    }
  }

  //필터 초기화
  function resetFilter() {
    resetFilterState();
    setSearchParams();
  }

  const SYoutSideClick = (e) => {
    if (!e.target.closest(".SYfilterLayerComponent")) {
      SYsetFilterPressed(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", SYoutSideClick);
  }, []);

  return (
    <div className="SYfilterWrap">
      <div className="filteringInfoWrap">
        <div className="filtering">
          <div className="filteringScroll">
            {SYfilterMenu.map((SYdata, SYindex) => (
            <button
              key={SYindex}
              type="button"
              className="filterCell"
              aria-selected={SYfilterSelect(SYdata)}
              aria-pressed={SYindex === SYfilterPressed ? true : false}
              onClick={() =>
                SYsetFilterPressed(SYindex !== SYfilterPressed ? SYindex : null)
              }
            >
              {SYfilterText(SYdata)}
            </button>
            ))}
          </div>
          
          <button type="button" className="reset" onClick={() => resetFilter()}>
            초기화
          </button>
        </div>
        <div className="SYfilterLayerWrap">
          {SYfilterMenu.filter((SYdata) => {
            const filterName = [
              "bclass",
              "region",
              "price",
              "supp_proc_step",
              "supp_sclass",
              "bthema",
              "schdl_cd",
              "house_count",
              "scale",
            ];
            return filterName.includes(SYdata.column);
          }).map((SYdata, SYindex) =>
            SYindex === SYfilterPressed
              ? SYfilterComponentCreate(SYdata, SYindex)
              : null
          )}
        </div>
      </div>
    </div>
  );
}

export default SYfilterComponents;
