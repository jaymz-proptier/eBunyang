import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "react-query";
import axios from "axios";
import { SYmetatag } from "../../components/layout";
import { usePath } from "../../shared/contexts/SYpath";
import { SYlocationInfoComponent, SYproductHeader } from "../";
import { SYaroundComponent, SYmoveInBasicInfo, SYmoveInFeatureInfo, SYmoveInPhotoComponent, SYmoveInPlanInfo, SYsponsorAD, SYmoveInDetailPopup } from "../moveIn";
import { SYreactGA4Title } from "../../hooks/";

function SYmoveInDetail() {
    const { search } = useLocation();
    const SYquery = queryString.parse(search);
    const { SYapiPath } = usePath();
    

    const SYsectionWrap = (props) => {
        const { data } = useQuery(["moveIn", SYquery.move_in_cd], () => axios.get(`${SYapiPath}/moveIn/basicDetail?move_in_cd=${SYquery.move_in_cd}`), "");
        const [open, setOpen] = useState(false);
        const [imgIndex, setImgIndex] = useState();

        const stickyRef = useRef(null);
        const [sticky, setSticky] = useState(null);
        const [offset, setOffset] = useState(205);

        // console.log(sticky);
        useEffect(() => {
            if (!stickyRef.current) {
                return;
            }
            setOffset(stickyRef.current.offsetTop);
        }, [stickyRef, offset]);

        useEffect(() => {
            const handleScroll = () => {
                if (!stickyRef.current) {
                    return;
                } else {
                    const stickyContent = document.getElementById("stickyContent");
                    const stickyHeight = stickyContent.clientHeight;
                    //   console.log(stickyHeight);
                    const stickyBgContent = document.getElementById("stickyBgContent");
                    const stickyBgHeight = stickyBgContent.clientHeight;

                    // console.log('window.scrollY', window.scrollY);
                    // console.log('stickyBgHeight', stickyBgHeight);
                    // console.log('window.scrollY + stickyHeight', window.scrollY + stickyHeight);

                    if ((window.scrollY + stickyHeight) - 177 > stickyBgHeight) {
                        setSticky("end");
                    } else if (window.scrollY > offset) {
                        setSticky("sticky");
                    } else {
                        setSticky(null);
                    }
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [sticky, stickyRef, offset]);


        if (data) {
            const SYdata = data.data.result;
            document.querySelector("title").innerHTML = SYdata.detail.build_nm;


        
            SYreactGA4Title(SYdata.detail.build_nm + " - 입주탐방");
            //이미지 경로 및 이름 가져오기
            function imgAllList() {
                let imgListA = [];
                let imgListB = [];

                SYdata.complexList.map(function (imgUrl) {
                    imgListA.push({ "idx": imgUrl.id, "image_url": imgUrl.big_image_url, "title": imgUrl.title });
                });

                SYdata.infraList.map(function (imgUrl) {
                    imgListB.push({ "idx": imgUrl.id, "image_url": imgUrl.big_image_url, "title": imgUrl.title });
                });

                const imgListC = imgListA.concat(imgListB);
                // console.log(imgListC);
                return imgListC;
            };

            //팝업창 상태 체크
            const SYdetailPopupState = (openState) => {
                setOpen(openState);
            }

            //클릭한 리스트 인덱스 값 리턴
            const checkImgUrl = (imgIdx) => {
                let findImgList = [];

                imgAllList().map(function (listImgId) {
                    findImgList.push({ "idx": listImgId.idx });
                });

                let findImgIdx = findImgList.findIndex(e => e.idx == imgIdx);
                // console.log(findImgIdx);

                return setImgIndex(findImgIdx);
            }


            return (
                <div className="sectionWrap detail">

                    <SYmetatag title={SYdata.detail.build_nm + " - 입주탐방"} meta_title={"[입주탐방]" + SYdata.detail.build_nm} description={SYdata.detail.address + " | 입주 " + SYdata.detail.moving_date + " | " + SYdata.detail.complex_info} image={SYdata.detail.image_url} />
                    <SYproductHeader SYdata={{ "build_nm": SYdata.detail.build_nm, "address": SYdata.detail.address, "bunyang_url": SYdata.detail.homepage, "sell_office_phone": SYdata.detail.contact_info, "view_count": SYdata.detail.view_count }} />
                    <div className="contentInfoWrap" id="stickyBgContent">
                        <div /* className="complexColumn" */ className={sticky === "sticky" ? "complexColumn sticky" : (sticky === "end" ? "complexColumn end" : "complexColumn")} ref={stickyRef}>
                            <div id="stickyContent" >
                            <SYsponsorAD SYparams={SYquery} />
                            </div>
                        </div>
                        <div className="complexColumn">
                            <div className="complexContentArea">
                                <div className="columnContentWrap">
                                    <SYmoveInFeatureInfo SYdata={SYdata.detail} />
                                    <SYmoveInBasicInfo SYdata={SYdata.detail} />
                                    {SYdata.scaleList.length > 0 ? <SYmoveInPlanInfo SYdata={SYdata.scaleList} /> : null}
                                    {SYdata.complexList.length > 0 ? <SYmoveInPhotoComponent SYtitle="단지안내" SYdata={SYdata.complexList} SYdetailPopupState={SYdetailPopupState} checkImgUrl={checkImgUrl} /> : null}
                                    {SYdata.infraList.length > 0 ? <SYmoveInPhotoComponent SYtitle="주변환경" SYdata={SYdata.infraList} SYdetailPopupState={SYdetailPopupState} checkImgUrl={checkImgUrl} /> : null}
                                    <SYmoveInDetailPopup SYdata={imgAllList()} open={open} SYdetailPopupState={SYdetailPopupState} imgIndex={imgIndex} />
                                    <SYlocationInfoComponent SYdata={SYdata.detail} />
                                    {SYdata.aroundList.length > 0 ? <SYaroundComponent SYdata={SYdata.aroundList} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }
    return (
        <div className="contentWrap tour">
            <SYsectionWrap />
        </div>
    );
}

export default SYmoveInDetail;
