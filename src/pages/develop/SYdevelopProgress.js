import React from "react";

function SYdevelopProgress({ SYdata }) {
  return (
    <div className="articleWrap developProgress">
      <div className="articleTitle">추진경과</div>
      <div className="articleContentWrap">
        <div className="articleContent">
          <div className="tableWrap">
            <div className="tableContent">
              {SYdata.map((loopData, index) => (
                <div
                  key={index}
                  className="tableRow"
                  aria-label={
                    loopData.status === "Y"
                      ? "진행"
                      : loopData.status === "W"
                      ? "예정"
                      : "완료"
                  }
                >
                  <div className="tableDataWrap">
                    <div className="tableData">{loopData.text}</div>
                  </div>
                  <div className="tableDataWrap">
                    <div className="tableData">
                      {loopData.start_date || "-"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYdevelopProgress;
