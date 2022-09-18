import * as NumberFormat from 'numeral';
export function getMessage(code, propList){
  let toReturn = "";
  if(propList  && propList.messages && propList.messages.length > 0){
    for(let i = 0; i < propList.messages.length; i++){
      if(propList.messages[i].tableCd == code){
        toReturn = propList.messages[i].tableE;
        break;
      }
    }
  }
  return toReturn;
}
 
export function getOptionValue(code, propList){
  let toReturn = "";
  if(propList    && propList.length > 0){
    for(let i = 0; i < propList.length; i++){
      if(propList[i].code == code){
        toReturn = propList[i].value;
        break;
      }
    }
  }
  return toReturn;
}

export function zeroPadNumber(theNumber, fillString){
  if(theNumber){
    return theNumber.padStart(3, fillString);
  }else {
    return 'N/A';
  }
}
export function formatNumber(theNumber){
  let toReturn = 0;
  if(theNumber){
    toReturn = formatMoney(parseFloat(theNumber), 2);
  }
  return toReturn;
}

export function formatWholeNumber(theNumber){
  let toReturn = 0;
  if(theNumber){
    
    toReturn = NumberFormat(parseFloat(theNumber)).format('0,0');;
  }
  return toReturn;
}

export function formatMoney(number, decPlaces, decSep, thouSep) {
  return NumberFormat(number).format('0,0.00');
}

export function formatNumberWithDecimal(theNumber){
  let toReturn = theNumber;
  if(theNumber || theNumber == 0){
    theNumber = theNumber / 100;
    toReturn = formatMoney(theNumber, 2);
  }
  return toReturn;
}

export function formatShortDate(theDate){
  let toReturn = "" + theDate;
  if(toReturn && toReturn.length == 6){
    toReturn = toReturn.substring(2,4) + "/" + toReturn.substring(4,6) + "/20" + toReturn.substring(0,2)
  }
  return toReturn;
}

export function showOnlyLastFour(numberToMask){
  let str = "" + numberToMask;
  str = str.replace(/.(?=.{4})/g, 'x');
  return str;
}
export function percentChange(firstNum, secondNum){
  let toReturn = 0;
  if(firstNum && secondNum){
    toReturn = ((firstNum - secondNum)/secondNum).toFixed(2);
  }
  return toReturn;
}

export function percentChangeIsUp(firstNum, secondNum){
  let toReturn = 0;
  if(firstNum && secondNum){
    toReturn = ((firstNum - secondNum)/secondNum).toFixed(2);
  }


  return toReturn > 0;
}

export function getSessionData(dataContainer, sessionData){
	let data = dataContainer.items;
	var duration = data[0].number_list.length/10000;
	console.log("All", dataContainer);
	var items = [];
	var o = 0;
	var maxPoints = 170;
	var dataLength = data.length/maxPoints;
	var ix = duration/dataLength;
	var anX;
	var toReturn = [], dataHolder = [];
	let aRow = null;
	
	/*
	for(var i = 0; i < data.length; i += maxPoints){
		items.push({"x": parseInt(o, 10), "y": parseFloat(data[i])})
		o += ix;
	}	 
	
	var holder = {"id": "session_data",
			"color": "hsl(80, 70%, 50%)",
			"data": items
	};
	
	toReturn.push(holder);*/
	let sample_rate = data[0].number_list.length/duration;
	 
	let lastYValue = 0; 
	for(var j = 0; j < data.length ; j++){
		items = [];
		dataLength = data[j].number_list.length /maxPoints;
		duration = (data[j].number_list.length)/sample_rate;
		ix = duration/dataLength;
		console.log("DataLength", data[0].number_list.length, "IX", ix);
		o = 0;
		console.log(ix, duration, data[j].number_list.length);
		/*for(var i = 0; i <  dataContainer.offset; i += maxPoints){
			items.push({"x": o, "y": 0})
			o += ix;
		}*/
		items.push({"x": 0, "y": 0})
		for(var i = 0; i < data[j].number_list.length - dataContainer.offset; i += maxPoints){
			lastYValue = parseFloat(data[j].number_list[i]);
			items.push({"x": o, "y": parseFloat(data[j].number_list[i])})
			o += ix;
		}	
		if(lastYValue != 0){//make y get to 0 on both sides
			items.push({"x": o, "y": 0})
		}
		let holder = {"id": data[j].type,
				"color": "hsl(80, 70%, 50%)",
				"data": items, "raw": data[j].number_list
		};
		
		dataHolder.push(holder);
		//console.log("Holder 123", holder);
	}
	
	console.log("Session", dataHolder);
	toReturn.push(dataHolder); 
	return toReturn;
}

export function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return(false);
}

export function translateResetToUserRecord(data){
  var toReturn = data;
  toReturn.registerQuestion1 = toReturn.question1;
  toReturn.registerQuestion2 = toReturn.question2;
  toReturn.registerQuestion3 = toReturn.question3;
  delete toReturn.question1;
  delete toReturn.question2;
  delete toReturn.question3;

  return toReturn;
}

export function getDisplayMessages(messages){
  var toReturn = "";
  if(messages && messages instanceof Array){
    for(let index in messages){
      toReturn += messages[index];
    }

  }
  return toReturn;
}

export function getOrganizationName(id, list){
  let toReturn  = "";
  if(list){
    for(let i = 0 ; i < list.length; i++){
      if(id == list[i].code){
        toReturn  = list[i].value;
        break;
      }
    }
  }
  return toReturn;
}

export function getValue(theValue){
  if(!theValue){
    return "";
  }else {
    if(typeof theValue === 'object'){
      return "";
    }else {
      return theValue;
    }
  }
}

export function getValueWithDefault(theValue, defaultValue = 'N/A'){
  if(!theValue){
    return defaultValue;
  }else {
    if(typeof theValue === 'object'){
      return defaultValue;
    }else {
      return theValue;
    }
  }
}
export function getObjectValue(theObject, theValue, defaultVal){
  let toReturn = defaultVal;
  if(theObject && theObject[theValue]){
    toReturn = theObject[theValue];
  }
  return toReturn;
}


export function getMessageWithParameters(errorCode, propList, params) {
  let message = getMessageStringParameters(getMessage(errorCode, propList), params);
  return message;
}

export function getMessageStringParameters(message, params) {
  for(var key in params){
    message = message.replace("{" + key + "}", params[key]);
  }
  return message;
}


export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function naIfEmpty(aValue){
  if(!aValue || aValue.length == 0 || aValue.trim().length == 0){
      return "N/A";
  }
  return aValue;
}

export function objectNaIfEmpty(theObject, theValue){
  if(!theObject || theObject[theValue].length == 0 || theObject[theValue].trim().length == 0){
      return "N/A";
  }
  return theObject[theValue];
}

export function formatYYYYMMDDDate(aValue){
  let toReturn = 'N/A';
  if(aValue){
    if(aValue.length == 5){
      aValue = "0" + aValue;
    }
    let year = aValue.substring(0, 4);
    let month = aValue.substring(4, 6);
    let day = aValue.substring(6, 8);
    toReturn = month +"/" + day + "/" + year;
  }
  return toReturn;
}


export function formatChargeBackNumber(aValue){
  let toReturn = 'N/A';
  if(aValue){
    aValue = parseFloat(aValue) / 100;
    return formatNumber(aValue);
  }
  return aValue;
}

export function formatCDate(aValue){
  let toReturn = 'N/A';
 
  if(aValue){
    if(aValue.length == 5){
      aValue = "0" + aValue;
    }
    let month = aValue.substring(0, 2);
    let day = aValue.substring(2, 4);
    let year = "20" + aValue.substring(4, 6);
    toReturn = month +"/" + day + "/" + year;
  }
  console.log("Format Date", aValue, toReturn);
  return toReturn;
}

export function formatYYMMDDDate(aValue){
  let toReturn = 'N/A';
 
  if(aValue){
    if(aValue.length == 5){
      aValue = "0" + aValue;
    }
    let year = "20" + aValue.substring(0, 2);
    let month = aValue.substring(2, 4);
    let day = aValue.substring(4, 6);
    toReturn = month +"/" + day + "/" + year;
  }
  console.log("Format Date", aValue, toReturn);
  return toReturn;
}

export function formatYYMMDate(aValue){
  let toReturn = 'N/A';
 
  if(aValue){
    if(aValue.length == 5){
      aValue = "0" + aValue;
    }
    let year =   aValue.substring(0, 2);
    let month = aValue.substring(2, 4);
    let day = aValue.substring(4, 6);
    toReturn = month +"/"  + year;
  }
  return toReturn;
}

export function getCurrentMerchant(merchantList, currentMerchant){
  let toReturn = "All Accounts";
  let m = {};
  if(currentMerchant && currentMerchant.length > 0){
    for(let i = 0; i < merchantList.length; i++){
      if(currentMerchant == merchantList[i].mm_cust_no){
        m = merchantList[i];
        toReturn = m.mm_dba_name + ", " + currentMerchant;
        break;
      }
    }
  }
  return toReturn;
}

export function formatDateTime(aValue){
  var toReturn = '';
  if(aValue){
      // console.log("ff", aValue);

      var dateVal = null;
      if(typeof aValue == "string") {
          dateVal = new Date(aValue);
      }else if(typeof aValue == "object") {
          dateVal = aValue;
      }
      var m = dateVal.getMonth() + 1; //Month from 0 to 11
      var d = dateVal.getDate();
      var y = dateVal.getFullYear();

      toReturn = '' + (m<=9 ? '0' + m : m) + '/' +  (d <= 9 ? '0' + d : d)  + '/' + y + ' ' + dateVal.getHours() + ':' + dateVal.getMinutes();

  }

  return toReturn;
}

export function getBaseUrl(){
  let baseUrl = '';
  if(/.*:3000.*/.test(window.location.host)){
    baseUrl = 'http://localhost:44386';
  }

  return baseUrl;
}
export function translate(aValue, theList){
  var toReturn = '';
  if(aValue && theList && theList.length > 0){
    for(let i = 0 ; i < theList.length; i++){
      if(theList[i].code == aValue){
        toReturn = theList[i].value;
        break;
      }
    }
  }
  return toReturn;
}
 
export function testPassword(passwordValue){
  var valid = false;
  var passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#!@$*^~%&()_+`\-={}\[\]|\\:";'<>,.?/])[a-zA-Z0-9#!@$*^~%&()_+`\-={}\[\]|\\:";'<>,.?/]{12,50}$/;
  if (passwordRegex.test(passwordValue)) {
    valid = true;
  }
  return valid;
}

export function formatTimeStamp(aValue){
  var toReturn = '';
  if(aValue){
    var dateVal = null;
    if(typeof aValue == "string" || typeof aValue == "number") {
      dateVal = new Date(aValue);
    }else if(typeof aValue == "object") {
      dateVal = aValue;
    }

    var m = dateVal.getMonth() + 1; //Month from 0 to 11
    var d = dateVal.getDate();
    var y = dateVal.getFullYear();

    var h = dateVal.getHours();
    var i = dateVal.getMinutes();
    var s = dateVal.getSeconds();
    var aP = h > 11 ? 'PM' : 'AM';
    h = h % 12;
    toReturn = '' + (m<=9 ? '0' + m : m) + '/' +  (d <= 9 ? '0' + d : d)  + '/' + y + ' ' + h + ':' + i + ':' + s + ' ' + aP;

  }

  return toReturn;
}

export function formatDate(aValue){
  var toReturn = '';
  if(aValue){
    var dateVal = null;
    if(typeof aValue == "string") {
      dateVal = new Date(aValue);
    }else if(typeof aValue == "object") {
      dateVal = aValue;
    }

    var m = dateVal.getMonth() + 1; //Month from 0 to 11
    var d = dateVal.getDate();
    var y = dateVal.getFullYear();

    toReturn = '' + (m<=9 ? '0' + m : m) + '/' +  (d <= 9 ? '0' + d : d)  + '/' + y;

  }

  return toReturn;
}


export function formatNoSeparatorDate(dateVal){
  var toReturn = '';
  if(dateVal){
    
    
    let m = dateVal.getMonth() + 1; //Month from 0 to 11
    let d = dateVal.getDate();
    let y = dateVal.getFullYear();

    toReturn = '.' + (m<=9 ? '0' + m : m) + '/' +  (d <= 9 ? '0' + d : d) ;

  }

  return toReturn;
}

export function formatPhone(theValue){
   //Filter only numbers from the input
   if(theValue && theValue[0] == '0'){
     theValue = theValue.substring(1);
   }
   let cleaned = ('' + theValue).replace(/\D/g, '');
  console.log("Phone", theValue);
   //Check if the input is of correct length
   let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
 
   if (match) {
     return '(' + match[1] + ') ' + match[2] + '-' + match[3]
   };
 
   return null
}

export function formatDbDate(aValue){
  var toReturn = '';
  if(aValue){
	  var dateVal = new Date(aValue);

    var m = dateVal.getMonth() + 1; //Month from 0 to 11
    var d = dateVal.getDate();
    var y = dateVal.getFullYear();

    toReturn = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' +  (d <= 9 ? '0' + d : d) ;

  }

  return toReturn;
}

