module.exports = function(window) {
	var parsedDetailedInfo = '';
	var result = '{"items":[{';
	var counter = 0;
	var contents = window.document.getElementsByClassName('paddingNone');
	for(i=0; i<contents.length; i++){
		if(counter == 0){
			result += '"' + contents[i].innerHTML + '":';
			counter++;
		}
		else{
			result += '"'+contents[i].innerHTML + '",';
			counter = 0;
		}
	 }
  	result = result.substring(0, result.length - 1);

	 result += '}]}';

	 result = result.replace(/ *\<[^)]*\> */g, "");
	 parsedDetailedInfo = JSON.parse( result );
	 return parsedDetailedInfo;
}

