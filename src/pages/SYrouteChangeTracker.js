import React from "react";
import ReactGA4 from "react-ga4";
const SYrouteChangeTracker = () => {
    ReactGA4.send({hitType: "pageview", path: location.href, location: location.href, title: document.title, page_referrer: "(self)"});
};

export default SYrouteChangeTracker;