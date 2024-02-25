import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SYkoreanPrice } from "../../hooks";

import {
  SYbclassFilter,
  SYpriceFilter,
  SYbthemaFilter,
  SYregionFilter,
} from "../../components/filter";

import { useRecoilState, useResetRecoilState } from "recoil";
import { siteReportFilterState } from "../../recoils/siteReport";

function SYfilterComponents() {
  const [SYfilterMenu, SYsetFilterMenu] = useState([]);
  const [SYfilterPressed, SYsetFilterPressed] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const bclass = searchParams.get("bclass") || "";
  const bthema = searchParams.get("bthema") || "";
  const [SYfilter, setSYfilter] = useRecoilState(siteReportFilterState);
  const resetFilterState = useResetRecoilState(siteReportFilterState);

  useEffect(() => {
    if (bclass || bthema) {
      setSYfilter({
        ...SYfilter,
        bclass: bclass,
        bthema: bthema,
      });
    }
  }, [bclass, bthema]);

  useEffect(() => {
    SYfilter.bclass
      ? searchParams.set("bclass", SYfilter.bclass)
      : searchParams.delete("bclass");
    SYfilter.bthema
      ? searchParams.set("bthema", SYfilter.bthema)
      : searchParams.delete("bthema");
    setSearchParams(searchParams);
  }, [bclass, bthema, SYfilter]);

  useEffect(() => {
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
        ],
      },
    ]);
  }, [SYfilter, bclass, bthema]);

  const SYsettingFilter = {
    region: SYregionFilter,
    bclass: SYbclassFilter,
    bthema: SYbthemaFilter,
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
    let text = "";

    switch (SYdata.column) {
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
          <button type="button" class="reset" onClick={() => resetFilter()}>
            초기화
          </button>
        </div>
        <div className="moreFiltering">
          <div className="filteringList">
            <div className="filteringlistWrap">
              {SYfilterMenu.filter((SYdata) => SYdata.column !== "region").map(
                (SYdata, SYindex) => (
                  <div key={SYindex} className="filterWrap">
                    <span className="title">{SYdata.title}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="SYfilterLayerWrap">
          {SYfilterMenu.filter((SYdata) => {
            const filterName = ["bclass", "region", "price", "bthema"];
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
