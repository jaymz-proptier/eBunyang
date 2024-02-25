import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SYregionFilter } from "../../components/filter";
import { SYbizStepFilter, SYbizTypeFilter } from "./filter";
import { useRecoilState, useResetRecoilState } from "recoil";
import { developFilterState } from "../../recoils/develop";

function SYfilterComponents() {
  const [SYfilterMenu, SYsetFilterMenu] = useState([]);
  const [SYfilterPressed, SYsetFilterPressed] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const biz_type_cd = searchParams.get("biz_type_cd") || "";
  const biz_step_cd = searchParams.get("biz_step_cd") || "";
  const [SYfilter, setSYfilter] = useRecoilState(developFilterState);
  const resetFilterState = useResetRecoilState(developFilterState);

  useEffect(() => {
    if (biz_type_cd || biz_step_cd) {
      setSYfilter({
        ...SYfilter,
        biz_type_cd: biz_type_cd,
        biz_step_cd: biz_step_cd,
      });
    }
  }, [biz_type_cd, biz_step_cd]);

  useEffect(() => {
    SYfilter.biz_type_cd
      ? searchParams.set("biz_type_cd", SYfilter.biz_type_cd)
      : searchParams.delete("biz_type_cd");
    SYfilter.biz_step_cd
      ? searchParams.set("biz_step_cd", SYfilter.biz_step_cd)
      : searchParams.delete("biz_step_cd");
    setSearchParams(searchParams);
  }, [biz_type_cd, biz_step_cd, SYfilter]);

  useEffect(() => {
    SYsetFilterMenu([
      {
        column: "region",
        title: "지역",
        text: SYfilter.bubdong.text,
      },
      {
        column: "biz_type_cd",
        title: "유형",
        text: "유형 전체",
        item: [
          {
            code: "21",
            title: "재개발",
            selected: biz_type_cd.includes("21"),
          },
          {
            code: "22",
            title: "재건축",
            selected: biz_type_cd.includes("22"),
          },
        ],
      },
      {
        column: "biz_step_cd",
        title: "추진단계",
        text: "추진단계 전체",
        item: [
          {
            code: "1",
            title: "구역지정",
            selected: biz_step_cd.includes("1"),
          },
          {
            code: "2",
            title: "추진위승인",
            selected: biz_step_cd.includes("2"),
          },
          {
            code: "3",
            title: "조합설립인가",
            selected: biz_step_cd.includes("3"),
          },
          {
            code: "4",
            title: "사업시행인가",
            selected: biz_step_cd.includes("4"),
          },
          {
            code: "5",
            title: "관리처분인가",
            selected: biz_step_cd.includes("5"),
          },
          {
            code: "6",
            title: "이주및철거",
            selected: biz_step_cd.includes("6"),
          },
          {
            code: "7",
            title: "착공및분양",
            selected: biz_step_cd.includes("7"),
          },
          {
            code: "8",
            title: "준공",
            selected: biz_step_cd.includes("8"),
          },
        ],
      },
    ]);
  }, [SYfilter, biz_type_cd, biz_step_cd]);

  const SYsettingFilter = {
    region: SYregionFilter,
    biz_type_cd: SYbizTypeFilter,
    biz_step_cd: SYbizStepFilter,
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
    return Array.isArray(SYdata["item"])
      ? SYdata["item"].filter((item) => item.selected === true).length > 0
        ? SYdata["item"]
            .filter((item) => item.selected === true)
            .map((item, i) => item.title)
            .join(",")
        : SYdata.text
      : SYdata.text;
  }

  function SYfilterSelect(SYdata) {
    return (
      Array.isArray(SYdata.item) && SYdata.item.some((item) => item.selected)
    );
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
            const filterName = ["region", "biz_type_cd", "biz_step_cd"];
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
