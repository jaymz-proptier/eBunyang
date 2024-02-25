import React from "react";
import { SYfilterComponents, SYmapComponents } from "../bunyang"
;
function SYbunyangMap() {
    return (
        <div className="contentWrap map">
            <SYfilterComponents />
            <SYmapComponents />
        </div>
    );
}

export default React.memo(SYbunyangMap);