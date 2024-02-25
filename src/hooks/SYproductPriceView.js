import { SYkoreanPrice } from "./";

export default function SYproductPriceView(SYminPrice, SYmaxPrice) {
    if(SYminPrice===0 && SYmaxPrice===0) return "미정";
    else if(SYminPrice===SYmaxPrice) return SYkoreanPrice({price: SYminPrice/10000, unit: ""});
    else return SYkoreanPrice({price: SYminPrice/10000, unit: ""}) +" ~ "+ SYkoreanPrice({price: SYmaxPrice/10000, unit: ""});
}