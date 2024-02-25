import React from "react";

function SYbunyangSchoolInfo( { SYdata } ) {
    return (
        <div className="articleWrap bunyangSchoolInfo">
            <div className="articleTitle">학군정보</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tableWrap">
                        <div className="tableHead">
                            <div className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData">학교명</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">학급당 학생수</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">교사당 학생수</div>
                                </div>
                            </div>
                        </div>
                        <div className="tableContent">
                            <div className="tableRow">
                                <div className="tableDataWrap rowContents">
                                    <div className="tableData schoolLabel">{SYdata.school_type}</div>
                                    <div className="tableData">{SYdata.school_nm}</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">{SYdata.class_per_student_cnt}명</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData">{SYdata.teacher_per_student_cnt}명</div>
                                </div>
                                <div className="tableDataWrap" aria-hidden="true">
                                    <div className="tableData schoolMore">더보기</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYbunyangSchoolInfo;