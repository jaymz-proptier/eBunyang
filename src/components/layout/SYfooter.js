import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SYsnsComponent } from "../../pages/";


function SYfooter() {
    const SYlocation = useLocation();
    const [companyOpen, setCompanyOpen] = useState(false);

    const companyInfoOpen = () => {
        {
            companyOpen === true
                ?
                setCompanyOpen(false)
                :
                setCompanyOpen(true)
        }
    }

    return SYlocation.pathname === "/bunyang/map" ? null : (
        <div className="SYfooter">
            <div className="footerWrap">
                <Link to="/" className="logo"><i className="SYicon"></i></Link>
                <div className="companyInfoWrap">
                    <div className={`companyInfoMobileBtn ${companyOpen ? "open" : ""}`} onClick={companyInfoOpen}>KMS 사업자 정보</div>
                    <div className={`companyInfoBx ${companyOpen ? "open" : ""}`}>
                        <div className="companyInfoBxInner">
                            <h3 className="info">(주)한국거래소시스템즈</h3>
                            <div className="infoWrap">
                                <div className="info">대표이사 : 서동록</div>
                                <div className="info">
                                    <span>사업자등록번호 : 214-87-09557</span>
                                    <span>통신판매업신고번호 : 제 2019-서울서초-0765 호</span>
                                </div>
                                <div className="info">서울특별시 서초구 방배로 107(방배동, 디엠타워 3관)</div>
                            </div>
                        </div>
                    </div>
                    <p className="notice">e분양페이지에 제공되는 모든 분양정보와 관련한 실제거래에 대해서 어떠한 책임도 부담하지 않습니다.</p>
                    <p className="copyright">Copyright © KMS All Rights Reserved.</p>
                </div>
                <div className="contactInfoWrap">
                    <div className="callInfo">
                        <h3 className="title">대표 전화</h3>
                        <div className="callNumber">1800-9672</div>
                    </div>
                    <div className="footerSns">
                        <SYsnsComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SYfooter;