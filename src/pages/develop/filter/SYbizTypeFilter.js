import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { developFilterState } from "../../../recoils/develop";

//개발사업유형 : 21.재개발, 22:재건축
function SYbizTypeFilter({ SYfilterMenu }) {
  const [filterCode, setFilterCode] = useRecoilState(developFilterState);
  const [searchParams, setSearchParams] = useSearchParams("");
  const biz_type_cd = searchParams.get("biz_type_cd") || "";

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    biz_type_cd: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: biz_type_cd.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (index) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const updatedMenu = filterMenu.biz_type_cd.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    let updatedCode = updatedMenu
      .filter((item) => item.selected)
      .map((item) => item.code)
      .join(":");

    setFilterMenu({
      ...filterMenu,
      biz_type_cd: updatedMenu,
    });

    setFilterCode({
      ...filterCode,
      biz_type_cd: updatedCode,
    });

    if (updatedCode) {
      newSearchParams.set("biz_type_cd", updatedCode);
    } else {
      newSearchParams.delete("biz_type_cd");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu.biz_type_cd.map((item, index) => (
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

export default SYbizTypeFilter;
