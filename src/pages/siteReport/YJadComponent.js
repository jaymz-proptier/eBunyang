import React from "react";
import { Link } from "react-router-dom";

function YJadComponent({ SYdata }) {
  return (
    <div className="complexRow">
      <div className="adContentArea">
        <div className="advertise">
          <a href={SYdata.link_url} className="" target="_blank">
            <img src={SYdata.image_url} className="banner_pc" alt={SYdata.title} title={SYdata.title} />
            <img src={SYdata.mobile_image_url} className="banner_mobile" alt={SYdata.title} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default YJadComponent;
