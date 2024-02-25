import React from "react";
import ReactGA4 from "react-ga4";

function SYreactGA4Event(SYdata) {
    //ReactGA4.event({category: SYdata.category?SYdata.category:"", action: SYdata.action?SYdata.action:"", label: SYdata.label?SYdata.label:"", value: SYdata.value?SYdata.value:"1"});
    ReactGA4.send({hitType: "event", eventCategory: SYdata.category?SYdata.category:"", eventAction: SYdata.action?SYdata.action:"", eventLabel: SYdata.label?SYdata.label:"", value: SYdata.value?SYdata.value:"1", nonInteraction: true});
}

export default SYreactGA4Event;