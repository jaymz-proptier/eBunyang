const SYkoreanPrice = (SYdata) => {
    const SYprice = Math.abs(SYdata.price);
    let SYfirst = (SYprice/100000000).toFixed(2);
	if(SYfirst>0.999) SYfirst = SYfirst +(SYdata.unit?"억":"");
	else SYfirst = Math.round(Math.floor(SYprice/10000)/1000,1) +(SYdata.unit?"천":"");
	return SYfirst;
}
export default function SYproductPriceShortView(SYminPrice, SYmaxPrice) {
    if(SYminPrice===0 && SYmaxPrice===0) return "미정";
    else if(SYminPrice===SYmaxPrice) return SYkoreanPrice({price: SYminPrice, unit: true});
    else return SYkoreanPrice({price: SYminPrice, unit: false}) +" ~ "+ SYkoreanPrice({price: SYmaxPrice, unit: true});
}