import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SYregionFilter,
  SYbclassFilter,
  SYymdFilter,
} from "../../components/filter";
import { useRecoilState, useResetRecoilState } from "recoil";
import { moveInFilterState } from "../../recoils/moveIn";

function SYfilterComponents() {
  const [SYfilterMenu, SYsetFilterMenu] = useState([]);
  const [SYfilterPressed, SYsetFilterPressed] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const bclass = searchParams.get("bclass") || "";
  const mvi_ymd = searchParams.get("mvi_ymd") || "";
  const [SYfilter, setSYfilter] = useRecoilState(moveInFilterState);
  const resetFilterState = useResetRecoilState(moveInFilterState);

  useEffect(() => {
    if (bclass || mvi_ymd) {
      setSYfilter({
        ...SYfilter,
        bclass: bclass,
        mvi_ymd: mvi_ymd,
      });
    }
  }, [bclass, mvi_ymd]);

  useEffect(() => {
    SYfilter.bclass
      ? searchParams.set("bclass", SYfilter.bclass)
      : searchParams.delete("bclass");
    SYfilter.mvi_ymd
      ? searchParams.set("mvi_ymd", SYfilter.mvi_ymd)
      : searchParams.delete("mvi_ymd");
    setSearchParams(searchParams);
  }, [bclass, mvi_ymd, SYfilter]);

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
        ],
      },
      {
        column: "mvi_ymd",
        title: "입주예정",
        text: "입주예정 전체",
        item: [
          {
            code: "1",
            title: "1년 이내",
            selected: mvi_ymd.includes("1"),
          },
          {
            code: "2",
            title: "2년 이내",
            selected: mvi_ymd.includes("2"),
          },
          {
            code: "3",
            title: "3년 이내",
            selected: mvi_ymd.includes("3"),
          },
        ],
      },
    ]);
  }, [SYfilter, bclass, mvi_ymd]);

  const SYsettingFilter = {
    region: SYregionFilter,
    bclass: SYbclassFilter,
    mvi_ymd: SYymdFilter,
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

    return Array.isArray(SYdata["item"])
      ? SYdata["item"].filter((item) => item.selected === true).length > 0
        ? SYdata["item"]
            .filter((item) => item.selected === true)
            .map((item, i) => item.title)
            .join(",")
        : SYdata.text
      : SYdata.text;
  }

  //체크가 되어있는지 안되어있는지
  //필터 선택할때 체크함
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
            const filterName = ["bclass", "region", "mvi_ymd"];
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
