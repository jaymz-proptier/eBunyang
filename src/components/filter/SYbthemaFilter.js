import React, { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { bunyangFilterState } from "../../recoils/bunyang";
import { siteReportFilterState } from "../../recoils/siteReport";

//분양테마 : VID.영상, VR.VR, VST.현장방문, AOP.옵션계산
function SYbthemaFilter({ SYfilterMenu }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const bthema = searchParams.get("bthema") || "";

  let filterCode;
  let setFilterCode;
  if (location.pathname === "/bunyang") {
    [filterCode, setFilterCode] = useRecoilState(bunyangFilterState);
  } else if (location.pathname === "/siteReport") {
    [filterCode, setFilterCode] = useRecoilState(siteReportFilterState);
  } else {
    [filterCode, setFilterCode] = useState();
  }

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    bthema: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: bthema.includes(item.code),
    })),
  });

  // 필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.bthema.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      bthema: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      bthema: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("bthema", updatedCode);
    } else {
      newSearchParams.delete("bthema");
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.bthema.map((item, index) => (
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

export default SYbthemaFilter;
