import React, { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { useDevelopListChartQuery } from "../../apis/bunyang/develop";

function SYdevelopStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SYdata, setSYdata] = useState([]);
  const bubdong_code = searchParams.get("bubdong_code") || "";

  const [currentTab, clickTab] = useState(0);

  const { data, isLoading, refetch } = useDevelopListChartQuery({
    params: {
      bubdong_code: bubdong_code,
    },
    onSuccess: (data) => {
      setSYdata(data.data.result);
    },
    onError: (error) => {
      console.log("Error[useDevelopListChartQuery]", error);
    },
  });

  
  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  useEffect(() => {
    refetch();
  }, [bubdong_code]);

  if (isLoading) return "";

  return (
    <div className="SYdevelopStatusWrap">
      <div className="developStatusWrap">
        <div className="developHeader">
          <h3 className="title">
            <span className="emphasis">
              {SYdata.addressInfo
                ? SYdata.addressInfo.sido + " " + SYdata.addressInfo.gugun
                : "전국"}
            </span>{" "}
            개발사업 현황
          </h3>
        </div>
        <div className="developStatus">
          <div className="developStatusTab">
            <div className="tabBx">
              {SYdata.chartList?.map((SYloopData, index) => (
                <div className={index === currentTab ? "tab focused" : "tab" }>
                  <button onClick={() => selectMenuHandler(index)}>
                    {SYloopData.categoryName}
                    <span className="count">{SYloopData.totalCount}</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="tabContent">
              {SYdata.chartList?.map((SYloopData, index) => (
                <div className={index === currentTab ? "tabContentInner focused" : "tabContentInner" }>
                  <Fragment>
                  {SYloopData.dataList?.map((SYsubLoopData) => (
                    <div key={SYsubLoopData.code} className="step">
                      <div className="title">{SYsubLoopData.text}</div>
                      <div className="count">{SYsubLoopData.count}</div>
                    </div>
                  ))}
                </Fragment>
                </div>
              ))}
            </div>
          </div>

          {SYdata.chartList?.map((SYloopData) => (
            <div
              key={SYloopData.categoryCode}
              className="statusWrap"
              aria-label={SYloopData.categoryName}
            >
              <div className="statusTitle">
                <h5 className="title">
                  {SYloopData.categoryName}
                  <span className="count">{SYloopData.totalCount}</span>
                </h5>
              </div>
              <div className="statusStepList">
                {SYloopData.dataList?.map((SYsubLoopData) => (
                  <div key={SYsubLoopData.code} className="step">
                    <div className="title">{SYsubLoopData.text}</div>
                    <div className="count">{SYsubLoopData.count}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SYdevelopStatus;
