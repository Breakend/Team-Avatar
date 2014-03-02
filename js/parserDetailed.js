var parsedDetailedInfo = '';
function parserDetailedInfo(){
	var result = '{"items":[{';
	var counter = 0;
	var contents = document.getElementsByClassName(' paddingNone');
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
	 parsedDetailedInfo = jQuery.parseJSON( result );
}

