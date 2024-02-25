import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const item_array = [
  { code: "PRV", title: "민간분양" },
  { code: "PUB", title: "공공분양" },
  { code: "RNT", title: "임대분양" },
  { code: "POI", title: "가점제" },
  { code: "LOT", title: "추첨제" },
];

function SuppFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const supp_sclass = searchParams.get("supp_sclass") ?? "";

  const [filterMenu, setFilterMenu] = useState({
    supp_sclass: item_array.map((item) => ({
      ...item,
      selected: supp_sclass.includes(item.code),
    })),
  });

  const handleFilterChange = (index) => {
    const updatedMenu = filterMenu["supp_sclass"].map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    setFilterMenu({
      ...filterMenu,
      supp_sclass: updatedMenu,
    });

    let updatedCode = updatedMenu
      .filter((data) => data.selected === true)
      .map((data) => data.code)
      .join(":");

    if (updatedCode) {
      searchParams.set("supp_sclass", updatedCode);
    } else {
      searchParams.delete("supp_sclass");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu["supp_sclass"].map((item, index) => (
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

export default SuppFilterComponent;
