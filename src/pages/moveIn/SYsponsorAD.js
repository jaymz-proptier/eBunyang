import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { usePath } from "../../shared/contexts/SYpath";

function SYsponsorAD({ SYparams }) {
    const { SYapiPath } = usePath();
    const { data } = useQuery(["sponsorAD", SYparams.move_in_cd], () => axios.get(`${SYapiPath}/moveIn/basicDetailPreview?move_in_cd=${SYparams.move_in_cd}`), "");
    const SYsponsorInfo = () => {

        if (data) {
            const SYdata = data.data.result.detail;
            return (
                <div className="tourInfoWrap">
                    <div className="articleTitle">{SYdata.sponsor_cd ? "이 단지가 더 알고 싶다면?" : "이 단지의 담당 공인중개사를 찾습니다."}</div>
                    <div className="articleContent">
                        <div className="agencyInfoWrap">
                            <div className="agencyImageWrap">
                                {SYdata.profile_image ? (<div className="agencyImg" alt={SYdata.shop_name} aria-label={SYdata.shop_name} style={{ backgroundImage: `url(${SYdata.profile_image})` }}></div>) : <div className="agencyImg"></div>}
                            </div>
                            {SYdata.sponsor_cd ? (
                                <div>
                                    <div className="articleBtnWrap">
                                        <a href={SYdata.homepage_url} target="_blank" className="articleBtn">
                                            <i className="Icon_btn" aria-label="중개사홈"></i>
                                            <p className="btnText">홈페이지</p>
                                        </a>
                                    </div>
                                    <div className="agencyName">{SYdata.shop_name}</div>
                                    <div className="agencyContact">{SYdata.shop_contact}</div>
                                </div>
                            ) :
                                <div>
                                    <div className="articleBtnWrap">
                                        {/* 광고/제휴 문의 제작 후 연결 */}
                                        <a href="/proposal" className="articleBtn">
                                            <i className="Icon_btn" aria-label="중개사문의"></i>
                                            <p className="btnText">문의하기</p>
                                        </a>
                                    </div>
                                    <div className="agencyContact">1800-9672</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            );
        }

    }
    if (data) {
        const SYdata = data.data.result.detail;
        return (
            <div className="">
                <div className="complexContentArea">
                    <div className="articleWrap">
                        <SYsponsorInfo />
                    </div>
                </div>
                <div className="adContentArea">
                    <a href={SYdata?.blog_url} className="bannerBox" target="_blank" rel="noopener noreferrer">
                        <div className="textArea">
                            <div className="bannerTilte">
                                <p>더 자세한 입주탐방 보기</p>
                                <i className="Icon_next"></i>
                            </div>
                            <div className="bannerText">e분양 블로그에서 더 자세한 내용을 확인하세요!</div>
                        </div>
                        <div className="iconArea">
                            <i className="Icon_banner" aria-label="컴퓨터"></i>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default SYsponsorAD;