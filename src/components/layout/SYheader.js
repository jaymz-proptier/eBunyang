import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SYheader() {
  const SYlocation = useLocation();

  const SYheaderMenu = [
    { title: "분양정보", url: "/bunyang" },
    { title: "현장방문", url: "/siteReport" },
    { title: "입주탐방", url: "/moveIn" },
    { title: "개발사업", url: "/develop" },
    { title: "부동산AtoZ", url: "/tip" },
    { title: "아파트 입주 물량", url: "/apt" },
    { title: "3기신도시", url: "/newCity" },
  ];

  const [openHeader, setOpenHeader] = useState(false);
  const openHeaderState = () => {
    {
      openHeader === true
        ?
        setOpenHeader(false)
        :
        setOpenHeader(true)
    }
  }
  if(SYlocation.pathname.indexOf("/map") > -1) document.querySelector("html").classList.add("map");
  else document.querySelector("html").classList.remove("map");
  return (
    <div
      className={`SYheader${SYlocation.pathname.indexOf("/detail") > -1 ? " detail" : SYlocation.pathname.indexOf("/map") > -1 ? " map" : ""
        }`}
    >
      <div className="headerWrap">
        <Link to="/" className="logo">
          <i className="Img_logo"></i>
        </Link>
        <div className="gnbWrap">
          {SYheaderMenu.map((SYdata, SYindex) => (
            <Link
              key={SYindex}
              to={SYdata.url}
              className="menu"
              aria-selected={
                SYlocation.pathname.indexOf(SYheaderMenu[SYindex].url) > -1
                  ? "true"
                  : "false"
              }
            >
              {SYdata.title}
            </Link>
          ))}
        </div>
        <div className={`headerMenuWrap ${openHeader === true ? "open" : ""}`}>
          <button type="button" className="close" onClick={openHeaderState}></button>
          <div className="menuWrap">
            <h5 className="menuTitle"><span>Menu</span></h5>
            <div className="menuItemWrap">
              {SYheaderMenu.map((SYdata, SYindex) => (
                <div key={SYindex} className="menuItem">
                  <Link
                   
                    to={SYdata.url}
                    onClick={openHeaderState}
                    className="menu"
                    aria-selected={
                      SYlocation.pathname.indexOf(SYheaderMenu[SYindex].url) > -1
                        ? "true"
                        : "false"
                    }
                  >
                    {SYdata.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="menuWrap">
            <h5 className="menuTitle"><span>공식 SNS</span></h5>
            <div className="snsItemWrap">

              <div className="snsItem">
                <a href="https://blog.naver.com/kmsrsun" target="_blank" className="sns">
                  <div className="snsIcon blog"></div>
                  <p>블로그</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://post.naver.com/kmsrsun" className="sns">
                  <div className="snsIcon post"></div>
                  <p>포스트</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://tv.naver.com/kms" className="sns">
                  <div className="snsIcon navertv"></div>
                  <p>네이버티비</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://www.facebook.com/ebunyang" className="sns">
                  <div className="snsIcon facebook"></div>
                  <p>페이스북</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://tv.kakao.com/channel/2689765/video" className="sns">
                  <div className="snsIcon kakaotv"></div>
                  <p>카카오티비</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://story.kakao.com/ch/ebunyang/feed" className="sns">
                  <div className="snsIcon kakaostory"></div>
                  <p>카카오스토리</p>
                </a>
              </div>

              <div className="snsItem">
                <a href="https://www.instagram.com/ebunyang/" className="sns">
                  <div className="snsIcon insta"></div>
                  <p>인스타그램</p>
                </a>
              </div>

            </div>
          </div>
        </div>
        <div className="buttonWrap">
          <button type="button" className="asideMenu" aria-pressed="false" onClick={openHeaderState}></button>
        </div>
      </div>
    </div>
  );
}

export default SYheader;
