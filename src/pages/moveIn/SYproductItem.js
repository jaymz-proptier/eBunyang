import React from "react";
import { Link } from "react-router-dom";

function SYproductItem({ SYdata }) {
    return (
        <Link to={`/moveIn/detail?move_in_cd=${SYdata.move_in_cd}`} className="listItem">            
            <div className="linkItem">
                { SYdata.image_url ? (<div className="thumbnail" style={{backgroundImage:`url(${SYdata.image_url})`}}></div>) : null }
                <div className="listInfo">
                    <div className="complexInfoWrap">
                        <div className="listTitle">{SYdata.build_nm}</div>
                        <div className="listAddress">{SYdata.address}</div>
                    </div>
                    <div className="complexInfoLabel">
                        <div className="bunyangLabel">
                            <div className="type" aria-label={SYdata.bclass_nm}>{SYdata.bclass_nm}</div>
                        </div>
                        <div className="optionLabel">
                        </div>
                    </div>
                </div>                                   
            </div>
        </Link>
    );
}
export default SYproductItem;