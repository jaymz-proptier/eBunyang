import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const item_array = [
  { code: "101", title: "모집공고" },
  { code: "300", title: "특별공급" },
  { code: "301", title: "1순위" },
  { code: "302", title: "2순위" },
  { code: "401", title: "당첨자발표" },
  { code: "501", title: "계약기간" },
];

function BthemaFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const schdl_cd = searchParams.get("schdl_cd") ?? "";

  const [filterMenu, setFilterMenu] = useState({
    schdl_cd: item_array.map((item) => ({
      ...item,
      selected: schdl_cd.includes(item.code),
    })),
  });

  const handleFilterChange = (index) => {
    const updatedMenu = filterMenu["schdl_cd"].map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    setFilterMenu({
      ...filterMenu,
      schdl_cd: updatedMenu,
    });

    let updatedCode = updatedMenu
      .filter((data) => data.selected === true)
      .map((data) => data.code)
      .join(":");

    if (updatedCode) {
      searchParams.set("schdl_cd", updatedCode);
    } else {
      searchParams.delete("schdl_cd");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu["schdl_cd"].map((item, index) => (
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

export default BthemaFilterComponent;
