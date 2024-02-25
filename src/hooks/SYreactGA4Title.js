import React from "react";
import ReactGA4 from "react-ga4";

function SYreactGA4Title(SYtitle) {
    ReactGA4.send({hitType: "pageview", path: location.href, location: location.href, title: SYtitle, page_referrer: "(self)"});
}

export default SYreactGA4Title;