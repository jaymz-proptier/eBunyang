import React, { useState } from "react";
import { SYlayerPhotoPupop } from "../../../components/layout";
import { SYreactGA4Title } from "../../../hooks";

function SYcomplexPhotoPreview( { SYdata }) {
    const [SYopenPopup, SYsetOpenPopup] = useState(false);
    const [SYimageNo, SYsetImageNo] = useState(0);
    const SYphotoPopupCheck = (SYvalue) => {
        if(SYvalue) {
            if(SYopenPopup) document.querySelector("body").classList.remove("popupView");
            else document.querySelector("body").classList.add("popupView");
            SYsetOpenPopup(!SYopenPopup);
            SYsetImageNo(SYvalue*1);
            SYreactGA4Title(document.title +" - 기본정보(사진보기)");
        } else SYsetImageNo(0);
    }
    return (
        <div className="articleWrap complexImgArea">
            <div className="articleContentWrap">
                <div className="articleContent">
                    <div className="imgLayout mainThumb">
                        <a href="javascript:void(0);" className="thumbWrap" role="img" onClick={() => SYphotoPopupCheck(SYdata[0] && SYdata[0].image_url ? "0" : "")}>
                            {SYdata[0] && SYdata[0].image_url ? (
                            <div className="imgBox" style={{backgroundImage:`url(${SYdata[0].image_url})`}}></div>
                            ) : (
                            <div className="imgBox NoImage"></div>
                            )}
                        </a>
                    </div>
                    <div className="imgLayout subThumb">
                        <a href="javascript:void(0);" className="thumbWrap" role="img" onClick={() => SYphotoPopupCheck(SYdata[1] && SYdata[1].thumb_image_url ? 1 : "")}>
                            {SYdata[1] && SYdata[1].image_url ? (
                            <div className="imgBox" style={{backgroundImage:`url(${SYdata[1].image_url})`}}></div>
                            ) : (
                            <div className="imgBox NoImage"></div>
                            )}
                        </a>
                        <a href="javascript:void(0);" className="thumbWrap" role="img" onClick={() => SYphotoPopupCheck(SYdata[2] && SYdata[2].thumb_image_url ? 2 : "")}>
                            {SYdata[2] && SYdata[2].image_url ? (
                            <div className="imgBox" style={{backgroundImage:`url(${SYdata[2].image_url})`}}></div>
                            ) : (
                            <div className="imgBox NoImage"></div>
                            )}
                        </a>
                        <a href="javascript:void(0);" className="thumbWrap" role="img" onClick={() => SYphotoPopupCheck(SYdata[3] && SYdata[3].thumb_image_url ? (SYdata.length > 3 ? "0" : 3) : "")}>
                            
                            {SYdata[3] && SYdata[3].image_url ? (
                            <div className="imgBox" style={{backgroundImage:`url(${SYdata[3].image_url})`}}></div>
                            ) : (
                            <div className="imgBox NoImage"></div>
                            )}
                            {SYdata.length > 3 ? (
                            <>
                            <div className="cover"></div>
                            <div className="popupviewBtn" onClick={() => SYphotoPopupCheck("0")}><i className="Icon_plus"></i><p className="text">전체보기</p></div>
                            </>
                            ) : null }
                        </a>
                    </div>
                </div>
            </div>
            {SYopenPopup ? ( <SYlayerPhotoPupop SYdata={SYdata} SYphotoPopupCheck={SYphotoPopupCheck} SYimageNo={SYimageNo} /> ) : null}
        </div>
    );
}

export default SYcomplexPhotoPreview;