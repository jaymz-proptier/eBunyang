import React, { useRef } from "react";

function SYbunyangScheduleInfo( { SYdata, SYlink } ) {
    const SYscheduleList = [];
    const SYcheckCode = useRef("완료");
    const SYcheckCount = useRef(0);
    SYcheckCount.current = 0;
    SYcheckCode.current = "완료";
    for(let i = 0; i < SYdata.length; i++) {
        SYscheduleList.push(<div key={i} className="tableRow" aria-label={SYdata[i].status_yn!=="N" && SYcheckCount.current===0 ? "진행" : SYcheckCode.current}>
            <div className="tableDataWrap">
                <div className="tableData">{SYdata[i].schdl_code}</div>
            </div>
            <div className="tableDataWrap">
                <div className="tableData">{SYdata[i].schdl_date}</div>
            </div>
        </div>);  
        if(SYdata[i].status_yn!=="N") {
            ++SYcheckCount.current;
            SYcheckCode.current = "예정";
        }                           
    }
    return(
        <div className="articleWrap bunyangDate">
            <div className="articleTitle">분양 일정</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tableWrap">
                        <div className="tableContent">
                            {SYscheduleList}      
                        </div>
                    </div>
                    <div className="caption">분양 일정은 건설사 사정에 다라 변경될 수 있습니다.</div>
                </div>
                {SYlink ? (
                <div className="articleBtnContent">
                    <div className="articleBtnWrap" aria-label="컬러버튼">
                        <a href={SYlink} className="articleBtn" target="_blank" rel="noopener noreferrer">사이버 견본주택 보러가기</a>
                    </div>
                </div>
                ) : null }
            </div>
        </div>
    );
}

export default SYbunyangScheduleInfo;