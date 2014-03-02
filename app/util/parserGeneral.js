//url to parse: http://www.healthycanadians.gc.ca/recall-alert-rappel-avis/search-recherche/simple?s=&plain_text=&f_mc=1&js_en=&page=1000
module.exports = function(window) {
  var parsedGenearalInfo = '';
  var temp = '';
  var resultTxt = '{ "items":[';
  var contents = window.document.getElementsByClassName('single_awr');
  for(i = 0; i<contents.length; i++){
    var current = contents[i];
    var title = current.getElementsByClassName('search_result_title')[0].innerHTML;
    var url = "http://www.healthycanadians.gc.ca" + current.getElementsByClassName('search_result_title')[0].attributes[0].value;
    // console.log(current.getElementsByClassName('margin-bottom-large'));
    var description = current.getElementsByClassName('margin-bottom-large')[0].innerHTML;
    title = title.replace(/\s{2,}/g, ' ');
    url = url.replace(/\s{2,}/g, ' ');
    description = description.replace(/\s{2,}/g, ' '); 
    temp+= '{ "itemName":' + '"' + title + '",\n' + '"description":' + '"' + description + '",' + '"url": "' + url + '"},' + "\n"; 
  }
  temp = temp.substring(0, temp.length - 2);
  resultTxt += temp + ']}';
  parsedGenearalInfo = JSON.parse( resultTxt );
  return parsedGenearalInfo;
}


// {"items":[
//   {
//     "itemName":" Undeclared milk in Burnbrae Farms brand Dried Whole Eggs ",
//     "description":" Undeclared milk in Burnbrae Farms brand Dried Whole Eggs Dried Whole Eggs 22.7 kg Burnbrae Farms food recall, food recalls, allergy alert, allergy alerts, public warning, food safety, food borne illness, food poisoning, food allergy, food allergies, milk, Burnbrae Farms... ",
//     "url":"http://www.healthycanadians.gc.ca/recall-alert-rappel-avis/inspection/2014/38163r-eng.php"}
//   ]
// }

