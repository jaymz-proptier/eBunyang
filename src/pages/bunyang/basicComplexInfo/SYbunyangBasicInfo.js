import React from "react";
import { SYnumberFormat } from "../../../hooks";

function SYbunyangBasicInfo( { SYdata }) {
    const SYbuildTypeInfo = {
        "apt":[
            {"title":"분양주소","value":SYdata.address},{"title":"단지규모","value":((SYdata.total_house_cnt)?"<div class='dataContent'>총 "+ SYdata.total_house_cnt +"</div>":"") + ((SYdata.flr_cnt)?"<div class='dataContent'>"+ SYdata.flr_cnt +"</div>":"") + ((SYdata.dong_cnt)?"<div class='dataContent'>총 "+ SYdata.dong_cnt +"개동</div>":"")},{"title":"공고시기","value":SYdata.recruit_date},{"title":"주차대수","value":SYdata.parking_cnt +"대(세대당 "+ SYdata.parking_per_cnt +"대)"},{"title":"난방방식","value":SYdata.heat_method},{"title":"건설사","value":SYdata.cmpy_nm},{"title":"청약가능통장","value":SYdata.bankbook_info},{"title":"전매제한","value":((SYdata.deny_mnpl_end_yn==="Y")?"전매제한단지":"전매가능단지")}
        ],
        "villa":[
            {"title":"분양주소","value":SYdata.address},{"title":"단지규모","value":((SYdata.total_house_cnt)?"<div class='info'>총 "+ SYdata.total_house_cnt +"</div>":"") + ((SYdata.flr_cnt)?"<div class='info'>총 "+ SYdata.flr_cnt +"</div>":"") + ((SYdata.dong_cnt)?"<div class='info'>총 "+ SYdata.dong_cnt +"개동</div>":"")},{"title":"분양일","value":SYdata.recruit_date},{"title":"주차대수","value":SYdata.parking_cnt +"대"},{"title":"승강기","value":((SYdata.elevator_yn=="Y")?"있음":"없음") + ((SYdata.elevator_seater)?"("+ SYdata.elevator_seater +"인승)":"")},{"title":"건설사","value":SYdata.cmpy_nm},{"title":"전매제한","value":((SYdata.deny_mnpl_end_yn==="Y")?"전매제한단지":"전매가능단지")},{"title":"특징","value":SYdata.build_point}
        ],
        "officetel":[
            {"title":"분양주소","value":SYdata.address},{"title":"단지규모","value":((SYdata.total_house_cnt)?"<div class='info'>총 "+ SYdata.total_house_cnt +"</div>":"") + ((SYdata.flr_cnt)?"<div class='info'>총 "+ SYdata.flr_cnt +"</div>":"") + ((SYdata.dong_cnt)?"<div class='info'>총 "+ SYdata.dong_cnt +"개동</div>":"")},{"title":"공고시기","value":SYdata.recruit_date},{"title":"주차대수","value":SYdata.parking_cnt +"대"},{"title":"난방방식","value":SYdata.heat_method},{"title":"건설사","value":SYdata.cmpy_nm},{"title":"전매제한","value":((SYdata.deny_mnpl_end_yn==="Y")?"전매제한단지":"전매가능단지")}
        ],
        "shop":[
            {"title":"분양주소","value":SYdata.address},{"title":"단지규모","value":((SYdata.total_house_cnt)?"<div class='info'>총 "+ SYdata.total_house_cnt +"</div>":"") + ((SYdata.flr_cnt)?"<div class='info'>총 "+ SYdata.flr_cnt +"</div>":"") + ((SYdata.dong_cnt)?"<div class='info'>총 "+ SYdata.dong_cnt +"개동</div>":"")},{"title":"공고시기","value":SYdata.recruit_date},{"title":"대지면적","value":SYnumberFormat(SYdata.land_size) +"㎡"},{"title":"연면적","value":SYnumberFormat(SYdata.sum_total_size) +"㎡"},{"title":"주차대수","value":SYdata.parking_cnt +"대"},{"title":"건설사","value":SYdata.cmpy_nm},{"title":"특징","value":SYdata.build_point}
        ]
    };
    const SYbuildTypeCategory = {
        "C01": "apt",
        "C02": "officetel",
        "D01": "villa",
        "M01": "villa",
        "H01": "shop",
        "J01": "shop",
    }
    const SYtextItemList = SYbuildTypeInfo[SYbuildTypeCategory[SYdata.bclass]];
    return (
        <div className="articleWrap bunyangBasicInfo">
            <div className="articleTitle">기본 정보</div>
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="tableWrap">
                        <div className="tableContent">
                            {SYtextItemList.map((SYloopData, SYindex) => (                            
                            <div key={SYindex} className="tableRow">
                                <div className="tableDataWrap">
                                    <div className="tableData">{SYloopData.title}</div>
                                </div>
                                <div className="tableDataWrap">
                                    <div className="tableData" dangerouslySetInnerHTML={{__html: SYloopData.value}}></div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYbunyangBasicInfo;