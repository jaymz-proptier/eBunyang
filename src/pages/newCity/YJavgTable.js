import React from 'react';

function TableRows(props) {
  const { dataList, categoryName } = props;
  
  return (
    <>
      {dataList.map((YJdata, index) => (
        <tr key={index}>
          {index === 0 && <td rowSpan="3">{categoryName}</td>}
          <td>{YJdata.biz_type}</td>
          <td>{YJdata.chungyak_won_icon === "N" ? "" : <i className="Icon_star"></i>}{YJdata.chungyak_won}</td>
          <td>{YJdata.child_point_icon === "N" ? "" : <i className="Icon_star"></i>} {YJdata.child_point}</td>
          <td>{YJdata.newlyweds_point_icon === "N" ? "" : <i className="Icon_star"></i>} {YJdata.newlyweds_point}</td>
          <td>{YJdata.old_parents_won_icon === "N" ? "" : <i className="Icon_star"></i>} {YJdata.old_parents_won}</td>
        </tr>
      ))}
    </>
  );
}

export default function Table(props) {
  const { preSubscWinLineList } = props;
  
  return (
    <tbody>
      <TableRows dataList={preSubscWinLineList[0].categoryList[0].dataList} categoryName={preSubscWinLineList[3].categoryList[0].categoryName} />
      <TableRows dataList={preSubscWinLineList[0].categoryList[0].dataList} categoryName={preSubscWinLineList[3].categoryList[1].categoryName} />
      <TableRows dataList={preSubscWinLineList[0].categoryList[0].dataList} categoryName={preSubscWinLineList[3].categoryList[2].categoryName} />
    </tbody>
  );
}