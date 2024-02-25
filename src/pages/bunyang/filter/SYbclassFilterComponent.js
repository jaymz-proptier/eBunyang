import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const item_array = [
  { code: "C01", title: "아파트" },
  { code: "C02", title: "오피스텔" },
  { code: "D01", title: "빌라/도시형" },
  { code: "H01", title: "상가/업무" },
  { code: "C03", title: "생활숙박시설" },
];

function SYbclassFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bclass = searchParams.get("bclass") ?? "";

  const [filterMenu, setFilterMenu] = useState({
    bclass: item_array.map((item) => ({
      ...item,
      selected: bclass.includes(item.code),
    })),
  });

  const handleFilterChange = (index) => {
    console.log(index);
    const updatedMenu = filterMenu["bclass"].map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    setFilterMenu({
      ...filterMenu,
      bclass: updatedMenu,
    });

    let updatedCode = updatedMenu
      .filter((data) => data.selected === true)
      .map((data) => data.code)
      .join(":");

    if (updatedCode) {
      searchParams.set("bclass", updatedCode);
    } else {
      searchParams.delete("bclass");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu["bclass"].map((item, index) => (
              <div
                key={index}
                className="checkbox type"
                aria-selected={item.selected}
                aria-pressed="false"
                onClick={() => { handleFilterChange(index); }}
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

export default SYbclassFilterComponent;
