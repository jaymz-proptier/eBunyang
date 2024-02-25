import React from "react";
import { SYnumberFormat } from "../../hooks/";

function YJavgPoint3({ SYdata }) {
  if (!SYdata) return "";

  return (
    <div>
      <ul className="list">
        <li className="item">
          <span className="title">일반청약 청약저축불입액</span>
          <span className="data">
            {SYnumberFormat(SYdata[3].chungyak_won_avg)}
            만원
          </span>
        </li>
        <li className="item">
          <span className="title">다자녀 청약가점</span>
          <span className="data">{SYdata[3].child_point_avg}점</span>
        </li>
        <li className="item">
          <span className="title">신혼부부 청약가점</span>
          <span className="data">{SYdata[3].newlyweds_point_avg}점</span>
        </li>
        <li className="item">
          <span className="title">노부모 청약저축불입액</span>
          <span className="data">
            {SYnumberFormat(SYdata[3].old_parents_won_avg)}
            만원
          </span>
        </li>
      </ul>

      <div className="tableWrap">
        <table className="tableTypeA">
          <thead>
            <tr>
              <th rowSpan="2">지구</th>
              <th rowSpan="2">타입</th>
              <th rowSpan="2">일반청약(만원)</th>
              <th colSpan="3">특별공급</th>
            </tr>
            <tr>
              <th>다자녀(점)</th>
              <th>신혼부부(점)</th>
              <th>노부모(만원)</th>
            </tr>
          </thead>
          <tbody>
            {SYdata[3].categoryList.map((YJdata, index) => {
              let isPrintCategoryName = true;

              return YJdata.dataList.map((loopData, dataIndex) => {
                const categoryNameCell = isPrintCategoryName && <td rowSpan={YJdata.dataList.length}>{YJdata.categoryName}</td>;
                isPrintCategoryName = false;

                return (
                  <tr key={dataIndex}>
                    {categoryNameCell}
                    <td>{loopData.biz_type}</td>
                    <td>
                      {loopData.chungyak_won_icon === "N" ? "" : <i className="Icon_star"></i>}
                      {SYnumberFormat(loopData.chungyak_won)}
                    </td>
                    <td>
                      {loopData.child_point_icon === "N" ? "" : <i className="Icon_star"></i>}
                      {loopData.child_point}
                    </td>
                    <td>
                      {loopData.newlyweds_point_icon === "N" ? "" : <i className="Icon_star"></i>}
                      {loopData.newlyweds_point}
                    </td>
                    <td>
                      {loopData.old_parents_won_icon === "N" ? "" : <i className="Icon_star"></i>}
                      {SYnumberFormat(loopData.old_parents_won)}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <p className="text">※ 당첨선은 수도권 기준이며, 수도권 신청이 없는 경우 해당 지역 기준 적용</p>
      </div>
    </div>
  );
}

export default YJavgPoint3;
