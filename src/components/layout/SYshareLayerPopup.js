import React, { useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

function SYshareLayerPopup({ SYsharePopupCheck }) {
    const SYsnsList = ["카카오톡", "페이스북", "카카오스토리", "네이버블로그", "밴드"];
    const SYsnsLink = ( SYdata ) => {
        if(SYdata==="카카오톡") {
            if(window.Kakao) {
                const kakao = window.Kakao;
                if (!kakao.isInitialized()) {
                    kakao.init("4ebb80ba3e47f203a6fa7fa4edf2ede9");
                }

                kakao.Link.sendDefault({
                    objectType: "feed",
                    content: {
                        title: document.title,
                        description: document.querySelector("meta[property='og:description']").getAttribute("content"),
                        imageUrl: "https:"+ document.querySelector("meta[property='og:image']").getAttribute("content"),
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href
                        }
                    },
                    buttons: [
                        {
                            title: "웹으로 보기",
                            link: {
                                mobileWebUrl: window.location.href,
                                webUrl: window.location.href
                            }
                        }
                    ]
                });
            }
        } else if(SYdata==="페이스북") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href};src=sdkpreparse`, "Facebook", "width=670,height=300");
        } else if(SYdata==="카카오스토리") {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init("4ebb80ba3e47f203a6fa7fa4edf2ede9");
            }
            //window.open(`https://story.kakao.com/share?url=${window.location.href}`, "_blank", "width=500 Height=637");
            kakao.Story.share({
                url: window.location.href,
                text: document.title,
            });
        } else if(SYdata==="네이버블로그") {
            window.open(`http://blog.naver.com/openapi/share?url=${window.location.href}`, "Blog", ""); 
        } else if(SYdata==="밴드") {
            window.open(`http://www.band.us/plugin/share?body=${document.title}&route=${window.location.href}`, "Blog", ""); 
        }
        SYsharePopupCheck();
    }
    const SYmodal = useRef();
    const SYclipboard = () => {
        alert("URL이 복사되었습니다.");
    }
    
    const SYoutSideClick = (e) => {
        if(SYmodal.current && !SYmodal.current.contains(e.target)) {
            SYsharePopupCheck();            
        }
    }
    return(
        <div className="SYpopupLayerWrap" onClick={SYoutSideClick}>
            <div className="popupContentWrap" ref={SYmodal}>
                <div className="popupHeader">
                    <div className="headerTitle">공유하기</div>
                    <button type="button" className="close" onClick={() => SYsharePopupCheck()}>
                        <i className="SYicon"></i>
                    </button>
                </div>
                <div className="popupContent">
                    <div className="shareContentWrap">
                        <div className="snsButtonWrap">
                            {SYsnsList.map((SYloopData) => (
                            <button key={SYloopData} type="button" className="snsButton" aria-label={SYloopData} onClick={() => SYsnsLink(SYloopData)}>
                                <i className="SYicon"></i>
                            </button>
                            ))}
                        </div>
                        <div className="copyButtonWrap">
                            <CopyToClipboard className="copyUrl" text={window.location.href} onCopy={() => SYclipboard()}>
                                <text>{window.location.href}</text>
                            </CopyToClipboard>
                            <div class="text">URL을 한 번 누르면 복사할 수 있어요</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SYshareLayerPopup;