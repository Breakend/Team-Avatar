//url to parse: http://www.healthycanadians.gc.ca/recall-alert-rappel-avis/search-recherche/simple?s=&plain_text=&f_mc=1&js_en=&page=1000
var resultTxt = '{ "items" : [';
function parseBriefInfo() {
  var temp = '';
  var contents = document.getElementsByClassName('single_awr');
  for(i = 0; i<contents.length; i++){
    var current = contents[i];
    var title = current.getElementsByClassName('search_result_title')[0].innerHTML;
    var url = "http://www.healthycanadians.gc.ca" + current.getElementsByClassName('search_result_title')[0].attributes[0].value;
    var description = current.getElementsByClassName('margin-bottom-large word_wrap')[0].innerHTML;
    title = title.replace(/\s{2,}/g, ' ');
    url = url.replace(/\s{2,}/g, ' ');
    description = description.replace(/\s{2,}/g, ' '); 
    temp+= '{ "itemName":' + '"' + title + '",' + '"description":' + '"' + description + '",' + '"url:" "' + url + '"},' + "\n"; 
  }
  temp = temp.substring(0, temp.length - 3);
  resultTxt = temp + ']}';
  console.log(resultTxt);
}

