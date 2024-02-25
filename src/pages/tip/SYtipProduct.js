import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SYtipProduct({ SYdata }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const viewPage = () => {
    navigate(`/tip/detail?blog_cd=${SYdata.blog_cd}`, {
      state: { prevParams: params.toString() },
    });
  };

  return (
    <li className="item">
      <Link
        to="#"
        className="linkItem"
        onClick={(e) => {
          e.preventDefault();
          viewPage();
        }}
      >
        {SYdata.image_url ? (
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${SYdata.image_url})` }}
          ></div>
        ) : null}
        <div className="textWrap">
          <div className="stateArea">
            <span className="stateLabel">#{SYdata.category_nm}</span>
          </div>
          <div className="titleArea">{SYdata.title}</div>
        </div>
      </Link>
    </li>
  );
}

export default SYtipProduct;
