import React from "react";

function YJimagesInfo({ SYdata, SYdetailPopupState, checkImgUrl }) {
  if (!SYdata) return "";

  return (
    <div className="detailTabpanel basicComplexInfo">
      <div className="articleWrap images">
        <div className="articleTitle">
          <div className="title">이미지</div>
        </div>
        <div className="articleContent">
          {SYdata.imageList.map((YJdata, index) => (
            <div
              key={index}
              className="itemWrap"
              onClick={() => {
                checkImgUrl(index), SYdetailPopupState(true);
              }}
            >
              <div className="itemImg">{YJdata.image_url ? <div className="imgBox" style={{ backgroundImage: `url(${YJdata.image_url})` }}></div> : null}</div>
              <div className="itemText">{YJdata.img_div}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YJimagesInfo;
