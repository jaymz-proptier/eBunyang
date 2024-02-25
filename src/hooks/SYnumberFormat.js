import React from "react";

function SYnumberFormat(sy_value) {
    return ((sy_value)?sy_value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'):0);
}

export default SYnumberFormat;