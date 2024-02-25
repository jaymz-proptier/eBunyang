import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { moveInFilterState } from "../../recoils/moveIn";

//입주예정 : 1년이내, 2년이내, 3년이내
function SYsuppFilter({ SYfilterMenu }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const mvi_ymd = searchParams.get("mvi_ymd") || "";

  let filterCode;
  let setFilterCode;
  if (location.pathname === "/moveIn") {
    [filterCode, setFilterCode] = useRecoilState(moveInFilterState);
  } else {
    [filterCode, setFilterCode] = "";
  }

  //필터 메뉴를 초기화
  const [filterMenu, setFilterMenu] = useState({
    mvi_ymd: SYfilterMenu.item.map((item) => ({
      ...item,
      selected: mvi_ymd.includes(item.code),
    })),
  });

  //필터 선택 항목이 변경될 때마다 호출
  const handleFilterChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // const updatedMenu = filterMenu.mvi_ymd.map((item, i) =>
    //   i === value ? { ...item, selected: !item.selected } : item
    // );

    // let updatedCode = updatedMenu
    //   .filter((item) => item.selected)
    //   .map((item) => item.code);

      setFilterMenu({
        ...filterMenu,
        mvi_ymd: value,
      });
  

      // console.log("value", value);
      // console.log("mvi_ymd", mvi_ymd);
  

    if (value === mvi_ymd) {
      newSearchParams.delete("mvi_ymd");
      setFilterCode({
        ...filterCode,
        mvi_ymd: "",
      });
    } else {
      newSearchParams.set("mvi_ymd", value);
      setFilterCode({
        ...filterCode,
        mvi_ymd: value,
      });
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {SYfilterMenu.item.map((item, index) => (
              <div
                key={index}
                className="checkbox type"
                aria-selected={item.selected}
                aria-pressed="false"
                onClick={() => handleFilterChange(item.code)}
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
