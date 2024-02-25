import React from "react";
import { Link } from "react-router-dom";

function YJaroundComponent({ SYdata }) {
  //console.log(SYdata);
  return (
    <div className="articleWrap aroundListWrap">
      <div className="articleContent">
        <div className="arroundTitle">주변 입주탐방 단지</div>
        <div className="articleContentWrap">
          <div className="aroundList">
            {SYdata.map((SYloopData) => (
              <>
                <Link to={`/siteReport/detail?report_cd=${SYloopData.report_cd}`} className="listItem">
                  <div className="linkItem">
                    {SYloopData.image_url ? <div className="thumbnail" style={{ backgroundImage: `url(${SYloopData.image_url})` }}></div> : null}

                    <div className="listInfo">
                      <div className="complexInfoLabel">
                        {SYloopData.bclass_nm ? (
                          <div className="bunyangLabel">
                            <div className="type" aria-label={SYloopData.bclass_nm}>
                              {SYloopData.bclass_nm}
                            </div>
                          </div>
                        ) : null}
                        <div className="optionLabel"></div>
                      </div>
                      <div className="complexInfoWrap">
                        <div className="listTitle">{SYloopData.build_nm}</div>
                        <div className="listAddress">{SYloopData.address}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YJaroundComponent;
