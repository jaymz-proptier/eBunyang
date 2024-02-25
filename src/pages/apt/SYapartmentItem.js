import React from "react";
import { SYnumberFormat } from "../../hooks/";

function SYhouseItem({ SYdata }) {
    return (
        <div className="tableRow">
            <div className="tableData">{SYdata.mvi_date}</div>
            <div className="tableData">{SYdata.build_nm}</div>
            <div className="tableData">{SYdata.address}</div>
            <div className="tableData">{SYnumberFormat(SYdata.total_house_cnt)}</div>
        </div>
    );
}
export default SYhouseItem;