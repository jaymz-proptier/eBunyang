import React, { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";
import { siteReportFilterState } from "../../recoils/siteReport";
import { moveInFilterState } from "../../recoils/moveIn";

//분양유형 : C01.아파트, C02.오피스텔, D01.빌라/도시형, H01.상가
function SYbclassFilter({ SYfilterMenu }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams("");
  const bclass = searchParams.get("bclass") || "";

  let filterCode;
  let setFilterCode;
  if (location.pathname === "/bunyang") {
    [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  } else if (location.pathname === "/siteReport") {
    [filterCode, setFilterCode] = useRecoilState(siteReportFilterState);
  } else if (location.pathname === "/moveIn") {
    [filterCode, setFilterCode] = useRecoilState(moveInFilterState);
  } else {
    [filterCode, setFilterCode] = useState();
  }

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    bclass: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: bclass.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.bclass.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      bclass: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      bclass: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("bclass", updatedCode);
    } else {
      newSearchParams.delete("bclass");
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.bclass.map((item, index) => (
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

export default SYbclassFilter;
