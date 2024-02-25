import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

//분양단계 : S12.분양중, S11.청약중, S01.분양계획, S13.미분양
function SYstepFilter({ SYfilterMenu }) {
  const [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const supp_proc_step = searchParams.get("supp_proc_step") || "";

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    supp_proc_step: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: supp_proc_step.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.supp_proc_step.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      supp_proc_step: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      supp_proc_step: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("supp_proc_step", updatedCode);
    } else {
      newSearchParams.delete("supp_proc_step");
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.supp_proc_step.map((item, index) => (
              <div
                key={index}
                className="checkbox type"
                aria-selected={item.selected}
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

export default SYstepFilter;
