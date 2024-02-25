import React from "react";

function SYdevelopBizTypeInfo(SYdata) {
    return SYdata.biz_step + (SYdata.old_year_date || SYdata.old_month_date ? " 후 "+ (SYdata.old_year_date && SYdata.old_year_date!==0? SYdata.old_year_date +"년 " : "") + (SYdata.old_month_date ? SYdata.old_month_date +"개월 " : "") +"경과" :"");
}

export default SYdevelopBizTypeInfo;