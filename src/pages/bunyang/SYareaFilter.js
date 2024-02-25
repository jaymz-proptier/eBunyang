import React from "react";

const SYareaFilter = React.memo(({ SYmapAddressObject }) => {
  return (
    <div className="areaFilterWrap">
      <div className="selectBox">
        <div className="selectItem">
          <i className="MSicon"></i>
          <label className="option">
            <span aria-label="sido">{SYmapAddressObject.sido}</span>
            <span aria-label="gugun">{SYmapAddressObject.gugun}</span>
            <span aria-label="dong">{SYmapAddressObject.dong}</span>
          </label>
        </div>
      </div>
    </div>
  );
});

export default SYareaFilter;
