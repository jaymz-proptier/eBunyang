import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

//분양일정 : 101.모집공고, 300.특별공급, 301.1순위, 302.2순위, 401.당첨자발표, 501.계약기간
function SYschdlFilter({ SYfilterMenu }) {
  const [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const schdl_cd = searchParams.get("schdl_cd") || "";

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    schdl_cd: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: schdl_cd.includes(item.code),
    })),
  });

  // 필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.schdl_cd.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      schdl_cd: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      schdl_cd: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("schdl_cd", updatedCode);
    } else {
      newSearchParams.delete("schdl_cd");
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.schdl_cd.map((item, index) => (
              <div
                key={index}
                className="checkbox type"
                aria-selected={item.selected}
                aria-pressed="false"
                onClick={() => handleFilterChange(index)}
              >
                <span className="text">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYschdlFilter;
