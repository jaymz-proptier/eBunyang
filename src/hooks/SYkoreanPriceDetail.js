import React from "react";

function SYkoreanPriceDetail(SYdata) {
	if(SYdata == 0) {
		return "0원";
	} else {
		function numberFormat(x) {
			if(x != null && x != '') {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} else {
				return "";
			}
		}
	
		var inputNumber = SYdata < 0 ? false : SYdata;
		var unitWords = ['', '만 ', '억 ', '조 ', '경 '];
		var unitWords2 = ['', '만', '억 ', '조 ', '경 '];
		var splitUnit = 10000;
		var splitCount = unitWords.length;
		var resultArray = [];
		var resultString = '';
	
		for (var i = 0; i < splitCount; i++) {
			var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
			unitResult = Math.floor(unitResult);
			if (unitResult > 0) {
				resultArray[i] = unitResult;
			}
		}
	
		for (var i = 0; i < resultArray.length; i++) {
			// if (!resultArray[i]) continue;
			if (resultArray[0] != null){
				resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
			} else {
				resultString = String(numberFormat(resultArray[i])) + unitWords2[i] + resultString;
			}
		}
	
		return resultString + "원";
	}
}

export default SYkoreanPriceDetail;