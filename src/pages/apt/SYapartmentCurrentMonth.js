import React from "react";
import CountUp from "react-countup";
import { SYnumberFormat } from "../../hooks/";

function SYapartmentCurrentMonth({ SYdata, currentYear, currentMonth }) {
  //당월 입주예정인 지역 세대수
  const getTotalCount = () => {
    const categoryData = SYdata.find(
      (items) => Number(items.categoryName) === currentYear
    );
    if (!categoryData) return [];
    const monthData = categoryData.dataList.find(
      (items) => Number(items.month) === currentMonth + 1
    );
    return monthData;
  };

  return (
    <div className="articleTitle">
      <div className="title">
        {currentYear}년 {currentMonth + 1}월 입주예정
      </div>
      <div className="count">
        <span className="num">
          <CountUp
            end={getTotalCount().house_cnt}
            separator=","
            decimal=","
            duration={1.5}
          />
        </span>{" "}
        세대
      </div>
    </div>
  );
}
export default SYapartmentCurrentMonth;
