import React from "react";

function SYkoreanPrice(SYdata) {
    const SYprice = Math.abs(SYdata.price);
	let SYfirst = 0, SYmiddle = 0, SYlast = 0;
	SYfirst = Math.floor(SYprice/10000);
	if(!SYfirst) SYfirst = 0;
	SYmiddle = Math.floor((SYprice - (SYfirst * 10000)));
	if(!SYmiddle) SYmiddle = 0;
	SYlast = Math.floor(SYprice - (SYfirst * 10000) - (SYmiddle));
	if(SYfirst > 0) SYfirst = SYfirst +"억";
	else SYfirst = "";
	if(SYmiddle > 0) SYmiddle = SYmiddle + ((SYfirst||SYlast===0)?"":",");
	else SYmiddle = "";
	if(SYlast===0) SYlast = "";
	return SYfirst.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + ((SYmiddle)?" ":"") + SYmiddle.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + ((SYlast)?SYlast.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'):"") + ((SYdata.unit)?((SYmiddle!=="" || SYlast!=="")?SYdata.unit:""):"");
}

export default SYkoreanPrice;