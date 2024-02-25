import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SYapartmentCurrentMonth, SYapartmentTotalGraph } from "./";
import { SYnumberFormat } from "../../hooks/";
import { useAptGraphQuery } from "../../apis/bunyang/apt";

function SYapartmentMainGraph() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [aptYearList, setAptYearList] = useState();
  const [year, setYear] = useState(currentYear);
  const bubdong_code = searchParams.get("bubdong_code") || "";

  const { data, refetch } = useAptGraphQuery({
    params: {
      bubdong_code: bubdong_code,
    },
    onSuccess: (data) => {
      setAptYearList(data.data.result.houseList);
    },
    onError: (error) => {
      console.log("Error[useAptGraphQuery]", error);
    },
  });

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [bubdong_code]);

  if (!aptYearList) return "";

  //해당 세대수의 월별 세대수
  const checkYearData = () => {
    let monthDataBox = [];

    for (let i = 0; i < aptYearList.length; i++) {
      if (Number({ year }.year) == Number(aptYearList[i].categoryName)) {
        aptYearList[i].dataList.map((data) => {
          monthDataBox.push(data.house_cnt);
        });
      }
    }
    return monthDataBox;
  };

  return (
    <div className="SYapartmentGraphWrap">
      <div className="complexContentArea">
        <div className="articleWrap">
          <SYapartmentCurrentMonth
            SYdata={aptYearList}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />

          <div className="articleContent">
            <SYapartmentTotalGraph SYdata={aptYearList} setYear={setYear} />
          </div>
        </div>
        <div className="articleWrap">
          <div className="articleContent">
            <div className="householdListWrap">
              <span className="unit">단위: 세대 수</span>
              <div className="householdList">
                <div className="tableRow">
                  <div className="thead">{year}년</div>
                  <div className="thead">1월</div>
                  <div className="thead">2월</div>
                  <div className="thead">3월</div>
                  <div className="thead">4월</div>
                  <div className="thead">5월</div>
                  <div className="thead">6월</div>
                  <div className="thead">7월</div>
                  <div className="thead">8월</div>
                  <div className="thead">9월</div>
                  <div className="thead">10월</div>
                  <div className="thead">11월</div>
                  <div className="thead">12월</div>
                </div>
                <div className="householdContent">
                  <div className="tableTxt">세대수</div>
                  {checkYearData().map((data, index) => {
                    return (
                      <div className="tableTxt" key={index}>
                        {SYnumberFormat(data)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYapartmentMainGraph;
