import React from "react";
import { Link } from "react-router-dom";

function SYproductItem({ SYdata }) {
  return (
    <div className="listItem">
      <Link to={`/develop/detail?biz_no=${SYdata.biz_no}`} className="linkItem">
        {SYdata.image_url ? (
          <div
            className="thumbnail"
            style={{ backgroundImage: `url(${SYdata.image_url})` }}
          ></div>
        ) : null}
        <div className={`listInfo ${SYdata.image_url ? "" : "noimg"}`}>
          <div className="complexInfoWrap">
            <div className="listTitle">{SYdata.biz_nm}</div>
            <div className="listAddress">{SYdata.address}</div>
          </div>
          <div className="complexInfoLabel">
            <div className="optionLabel">
              {SYdata.biz_type_nm ? (
                <div className="option" aria-label={SYdata.biz_type_nm}>
                  {SYdata.biz_type_nm}
                </div>
              ) : null}
              {SYdata.biz_step_nm ? (
                <div className="option" aria-label={SYdata.biz_step_nm}>
                  {SYdata.biz_step_nm}
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
