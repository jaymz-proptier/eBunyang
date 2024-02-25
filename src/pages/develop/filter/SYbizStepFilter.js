import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { developFilterState } from "../../../recoils/develop";

//추진단계 : 1.구역지정, 2.추진위승인, 3.조합설립인가, 4.사업시행인가, 5.관리처분인가, 6.이주및철거, 7.착공및분양, 8.준공
function SYbizStepFilter({ SYfilterMenu }) {
  const [filterCode, setFilterCode] = useRecoilState(developFilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const biz_step_cd = searchParams.get("biz_step_cd") || "";

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    biz_step_cd: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: biz_step_cd.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.biz_step_cd.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      biz_step_cd: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      biz_step_cd: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("biz_step_cd", updatedCode);
    } else {
      newSearchParams.delete("biz_step_cd");
    }
    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.biz_step_cd.map((item, index) => (
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

export default SYbizStepFilter;
