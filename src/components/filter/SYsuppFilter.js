import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";

//분양형태 : PRV.민간분양, PUB.공공분양, RNT.임대분양, POI.가점제, LOT.추첨제
function SYsuppFilter({ SYfilterMenu }) {
  const [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  const [searchParams, setSearchParams] = useSearchParams("");
  const supp_sclass = searchParams.get("supp_sclass") || "";

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    supp_sclass: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: supp_sclass.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.supp_sclass.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      supp_sclass: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      supp_sclass: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("supp_sclass", updatedCode);
    } else {
      newSearchParams.delete("supp_sclass");
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.supp_sclass.map((item, index) => (
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

export default SYsuppFilter;
