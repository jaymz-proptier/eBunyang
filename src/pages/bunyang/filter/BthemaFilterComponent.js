import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const item_array = [
  { code: "VID", title: "영상" },
  { code: "VR", title: "VR" },
  { code: "VST", title: "현장방문" },
  { code: "AOP", title: "상가/옵션계산" },
];

function BthemaFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bthema = searchParams.get("bthema") ?? "";

  const [filterMenu, setFilterMenu] = useState({
    bthema: item_array.map((item) => ({
      ...item,
      selected: bthema.includes(item.code),
    })),
  });

  const handleFilterChange = (index) => {
    const updatedMenu = filterMenu["bthema"].map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    setFilterMenu({
      ...filterMenu,
      bthema: updatedMenu,
    });

    let updatedCode = updatedMenu
      .filter((data) => data.selected === true)
      .map((data) => data.code)
      .join(":");

    if (updatedCode) {
      searchParams.set("bthema", updatedCode);
    } else {
      searchParams.delete("bthema");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu["bthema"].map((item, index) => (
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
