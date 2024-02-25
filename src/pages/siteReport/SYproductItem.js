import React from "react";
import { Link } from "react-router-dom";

function SYproductItem({ SYdata }) {
  return (
    <div className="listItem">
      <Link to={`/siteReport/detail?report_cd=${SYdata.report_cd}`} className="linkItem">
        {SYdata.image_url ? <div className="thumbnail" style={{ backgroundImage: `url(${SYdata.image_url})` }}></div> : null}
        <div className={`listInfo ${SYdata.image_url ? "" : "noimg"}`}>
          <div className="complexInfoWrap">
            <div className="listTitle">{SYdata.build_nm}</div>
            <div className="listAddress">{SYdata.address}</div>
          </div>
          <div className="complexInfoLabel">
            <div className="bunyangLabel">
              <div className="type" aria-label={SYdata.bclass_nm}>
                {SYdata.bclass_nm}
              </div>
            </div>
            <div className="optionLabel">
              {SYdata.video_yn === "Y" ? (
                <div className="option" aria-label={SYdata.video_yn === "Y" ? "내부영상" : null}>
                  {SYdata.video_yn === "Y" ? "내부영상" : null}
                </div>
              ) : null}
              {SYdata.vr_yn === "Y" ? (
                <div className="option" aria-label={SYdata.vr_yn === "Y" ? "VR" : null}>
                  {SYdata.vr_yn === "Y" ? "VR" : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SYproductItem;
