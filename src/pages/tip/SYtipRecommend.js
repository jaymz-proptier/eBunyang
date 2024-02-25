import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SYtipRecommend({ SYdata }) {
  if (!SYdata) return null;
  if (SYdata.length === 0) return null;

  const navigate = useNavigate();
  const viewPage = (SYdata) => {
    navigate(`/tip/detail?blog_cd=${SYdata.blog_cd}`, {
      state: { prevParams: window.history.state?.usr?.prevParams },
    });
  };

  return (
    <div className="complexContentArea recommend">
      <div className="columnContentWrap">
        <div className="articleWrap">
          <div className="articleTitleWrap">
            <div className="articleTitle">연관 추천 콘텐츠</div>
          </div>
          <div className="articleContentWrap">
            <div className="articleContent">
              <div className="recommendContent">
                <ul className="itemList">
                  {SYdata?.map((loopData, index) => (
                    <li key={index} className="recommendItem">
                      <a
                        href={`#`}
                        className="linkItem"
                        onClick={(e) => {
                          e.preventDefault();
                          viewPage(loopData);
                        }}
                      >
                        <div className="number">{index + 1}</div>
                        <div className="item">{loopData.title}</div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SYtipRecommend;
