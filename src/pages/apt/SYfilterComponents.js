import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SYregionFilter } from "../../components/filter";
import { useRecoilState } from "recoil";
import { aptFilterState } from "../../recoils/apt";

function SYfilterComponents() {
  const [SYfilterMenu, SYsetFilterMenu] = useState([]);
  const [SYfilterExpanded, SYsetFilterExpanded] = useState(false);
  const [SYfilterPressed, SYsetFilterPressed] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const bubdong_code = searchParams.get("bubdong_code") || "";
  const [SYfilter, setSYfilter] = useRecoilState(aptFilterState);
  const SYmodal = useRef();

  useEffect(() => {
    if (SYfilter.bubdong.value) {
      searchParams.set("bubdong_code", SYfilter.bubdong.value);
    }
    setSearchParams(searchParams);
  }, [SYfilter, bubdong_code]);

  useEffect(() => {
    SYsetFilterMenu([
      {
        column: "region",
        title: "지역",
        text: SYfilter.bubdong.text,
      },
    ]);
  }, [SYfilter]);

  const SYsettingFilter = {
    region: SYregionFilter,
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
  const SYoutSideClick = (e) => {
    if (SYmodal.current && !SYmodal.current.contains(e.target)) {
      SYsetFilterPressed(null);
    }
  };

  return (
    <div className="SYfilterWrap">
      <div className="filteringInfoWrap">
        <h2>아파트 입주 물량</h2>
        <div className="filtering" aria-expanded={SYfilterExpanded}>
          {SYfilterMenu.map((SYdata, SYindex) => (
            <button
              key={SYindex}
              type="button"
              className="filterCell"
              aria-selected={SYdata.selected}
              aria-pressed={SYindex === SYfilterPressed ? true : false}
              onClick={() =>
                SYsetFilterPressed(SYindex !== SYfilterPressed ? SYindex : null)
              }
            >
              {SYdata.text}
            </button>
          ))}
        </div>
        <div
          className="SYfilterLayerWrap"
          onClick={SYoutSideClick}
          aria-hidden={
            SYfilterPressed ? false : SYfilterPressed === 0 ? false : true
          }
        >
          <div className="filterLayerwrap" ref={SYmodal}>
            {SYfilterMenu.filter((SYdata) => {
              const filterName = ["bclass", "region"];
              return filterName.includes(SYdata.column);
            }).map((SYdata, SYindex) =>
              SYindex === SYfilterPressed
                ? SYfilterComponentCreate(SYdata, SYindex)
                : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYfilterComponents;
