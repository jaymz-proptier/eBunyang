import React from "react";

function YJbasicInfoComponent({ SYdata }) {
  const SYbaseInfoList = [
    { title: "주소", value: SYdata.address },
    { title: "면적", value: SYdata.scale_info },
    { title: (SYdata.bclass === "C02" || SYdata.bclass === "H01" ? "호실" : "세대") + "수", value: SYdata.house_info },
    { title: "층수", value: SYdata.floor_info },
    { title: "동수", value: SYdata.dong_info },
    { title: "입주시기", value: SYdata.moving_date },
    { title: "건설사", value: SYdata.company_info },
  ];

  return (
    <div className="articleWrap">
      <div className="articleContent">
        <div className="articleTitle">
          <div className="text">상세 정보</div>
          <div className="num">01</div>
        </div>
        <div className="tableWrap">
          <div className="tableTitle">{SYdata.title}</div>
          <div className="tableContent">
            {SYbaseInfoList.map((SYloopData, SYindex) => (
              <div key={SYindex} className="rowContent">
                <span className="label">{SYloopData.title}</span>
                {SYloopData.value}
              </div>
            ))}
          </div>
          {SYdata.homepage ? (
            <a href={SYdata.homepage} className="infoBtn" target="_blank" rel="noopener noreferrer">
              <i className="Icon_home"></i>
              분양홈페이지
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default YJbasicInfoComponent;
