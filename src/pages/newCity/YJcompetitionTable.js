import React from "react";

function YJcompetitionTable({ SYdata }) {
  if (!SYdata) return "";

  return (
    <div className="tableContent competitionContent">
      <div className="tableRow">
        <div className="tableData">구분</div>
        <div className="tableData">1차</div>
        <div className="tableData">2차</div>
        <div className="tableData">3차</div>
        <div className="tableData">4차</div>
      </div>
      <div className="tableRow averageRow">
        <div className="tableData">평균</div>
        <div className="tableData">{SYdata.avg_rate_1}</div>
        <div className="tableData">{SYdata.avg_rate_2}</div>
        <div className="tableData">{SYdata.avg_rate_3}</div>
        <div className="tableData">{SYdata.avg_rate_4}</div>
      </div>

      <div className="tableRow">
        <div className="tableData">공공분양</div>
        <div className="tableData">{SYdata.public_house_1}</div>
        <div className="tableData">{SYdata.public_house_2}</div>
        <div className="tableData">{SYdata.public_house_3}</div>
        <div className="tableData">{SYdata.public_house_4}</div>
      </div>

      <div className="tableRow">
        <div className="tableData">신혼희망타운</div>
        <div className="tableData">{SYdata.hope_town_1}</div>
        <div className="tableData">{SYdata.hope_town_2}</div>
        <div className="tableData">{SYdata.hope_town_3}</div>
        <div className="tableData">{SYdata.hope_town_4}</div>
      </div>
    </div>
  );
}

export default YJcompetitionTable;
