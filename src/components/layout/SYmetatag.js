import React from "react";
import { Helmet } from "react-helmet-async";

const SYmetatag = props => {
    return(
        <Helmet>
            <title>{props.title?props.title:"믿고찾는 분양정보, e분양"}</title>
            <meta name="description" content={props.description?props.description:"청약 일정부터 VR랜선투어까지, e분양에서 쉽고 빠르게 찾아보세요!"} />
            <meta name="keywords" content={props.keywords?props.keywords:"분양정보, 현장방문, 입주탐방, 부동산AtoZ, 청약, 청약일정, 빌라, 오피스텔, 아파트, 신축분양, 분양"} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.meta_title?props.meta_title:"믿고찾는 분양정보, e분양"} />
            <meta property="og:site_name" content={props.title?props.title:"믿고찾는 분양정보, e분양"} />
            <meta property="og:description" content={props.description?props.description:"청약 일정부터 VR랜선투어까지, e분양에서 쉽고 빠르게 찾아보세요!"} />
            <meta property="og:image" content={props.image?props.image:"https://www.ebunyang.co.kr/public/images/sns_share_image.png"} />
            <meta property="og:url" content={props.url?props.url:"https://www.ebunyang.co.kr/"} />
            <meta name="twitter:title" content={props.meta_title?props.meta_title:"믿고찾는 분양정보, e분양"} />
            <meta name="twitter:description" content={props.description?props.description:"청약 일정부터 VR랜선투어까지, e분양에서 쉽고 빠르게 찾아보세요!"} />
            <meta name="twitter:image" content={props.image?props.image:"https://www.ebunyang.co.kr/public/images/sns_share_image.png"} />
            <link rel="canonical" href={props.url?props.url:"https://www.ebunyang.co.kr/"} />
        </Helmet>
    );
}

export default SYmetatag;