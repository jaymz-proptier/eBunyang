import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const item_array = [
  { code: "S12", title: "분양중" },
  { code: "S11", title: "청약중" },
  { code: "S01", title: "분양계획" },
  { code: "S13", title: "미분양" },
];

function StepFilterComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const supp_proc_step = searchParams.get("supp_proc_step") ?? "";

  const [filterMenu, setFilterMenu] = useState({
    supp_proc_step: item_array.map((item) => ({
      ...item,
      selected: supp_proc_step.includes(item.code),
    })),
  });

  const handleFilterChange = (index) => {
    const updatedMenu = filterMenu["supp_proc_step"].map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );

    setFilterMenu({
      ...filterMenu,
      supp_proc_step: updatedMenu,
    });

    let updatedCode = updatedMenu
      .filter((data) => data.selected === true)
      .map((data) => data.code)
      .join(":");

    if (updatedCode) {
      searchParams.set("supp_proc_step", updatedCode);
    } else {
      searchParams.delete("supp_proc_step");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="SYfilterLayerComponent">
      <div className="innerFilterwrap">
        <div className="filterContainer">
          <div className="checkboxWrap">
            {filterMenu["supp_proc_step"].map((item, index) => (
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

export default StepFilterComponent;
