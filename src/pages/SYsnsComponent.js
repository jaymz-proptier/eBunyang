import React from "react";

function SYsnsComponent() {
    
    const SYheaderSNSMenu = [{"title":"블로그","url":"https://blog.naver.com/kmsrsun"},{"title":"포스트","url":"https://post.naver.com/kmsrsun"},{"title":"페이스북","url":"https://www.facebook.com/ebunyang"},{"title":"인스타그램","url":"https://www.instagram.com/ebunyang/"},{"title":"카카오스토리","url":"https://story.kakao.com/ch/ebunyang/feed"},{"title":"카카오티비","url":"https://tv.kakao.com/channel/2689765/video"},{"title":"네이버티비","url":"https://tv.naver.com/kms"}];

    return(
        <div className="snsComponent">
            {SYheaderSNSMenu.map((SYdata, SYindex) => (
            <a href={SYdata.url} key={SYindex} className="menu" aria-label={SYdata.title} target="_blank" rel="noopener noreferrer">
                <i className="SYicon"></i>
                {SYdata.title}
            </a>
            ))}
        </div>
    );
}

export default SYsnsComponent;