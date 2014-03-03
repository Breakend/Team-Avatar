/*
 *	routes.js
 *	
 *	This file contains all the routes served by the node.js app 
 */

var deepPopulate = require('../app/util/mongoose-helper.js');
var Reports = require('../app/models/reports.js');
var http = require('http');
var generalParser = require('../app/util/parserGeneral.js');
var detailParser = require('../app/util/parserDetailed.js');

//Parse web page for data
var jsdom = require("jsdom");

parseWebpage();
var data;
var data_details = [];

module.exports = function(app){


	// Get: login request
	app.get('/', function(req, res){
		if(data && data_details && data.items.length == data_details.length){
			res.render('maindata',{
				data : data,
				details : data_details
			})

			for(var i = 0 ;i <data_details.length;i++){
				console.log(data_details[i].items);
				console.log(data_details[i].items[0]["Starting Date"]);
			}
		}
		else{
			res.render('main');
		}
	});

	app.post('/report', function(req, res){
		Reports.createReport(req, res);
	})

	app.get('/contact', function(req, res){
		res.render('contact');
	});

	app.get('/report', function(req, res){
		res.render('report');
	});

	app.get('/unofficial', function(req, res){
		Reports.getAll(function(err, reports){
			res.render('unverified', {
				reports : reports
			});
		})

	});


	// app.get('/borderinfo', function(req, res){
	// 	var options = {
	// 	  host: 'www.cbsa-asfc.gc.ca',
	// 	  port: 80,
	// 	  path: '/bwt-taf/bwt-eng.csv'
	// 	};

	// 	http.get(options, function(resp) {
	// 	  console.log("Got response: " + resp.statusCode);
	// 		resp.on("data", function(chunk) {
	// 			// res.writeHead(200, { 'Content-Type': 'text/plain'});
	// 			res.write(chunk);
	// 			res.end();
	// 		  });
 //  		}).on('error', function(e) {
	// 	  console.log("Got error: " + e.message);
	// 	});

	// });

	// app.get('/reports',  function(req, res){
	// 	Reports.getAll(function(reports){
	// 		res.render('reportdisplay', {
	// 			reports: reports
	// 		})
	// 	})
	// });

}

function parseWebpage(){

jsdom.env(
  "http://www.healthycanadians.gc.ca/recall-alert-rappel-avis/search-recherche/simple?s=&plain_text=&f_mc=1&js_en=&page=45",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    // console.log("there have been", window.$("a").length, "nodejs releases!");
  	var general = generalParser(window);
  	// console.log(general);
  	data = general;
  	for(var i = 0; i < data.items.length; i++){
  		jsdom.env(
			data.items[i].url,
		  ["http://code.jquery.com/jquery.js"],
		  function (errors, window) {
		    // console.log("there have been", window.$("a").length, "nodejs releases!");
		  	var details = detailParser(window);
		  	// console.log(general);
		  	data_details.push(details);
		  	// console.log(data_details.get(i));
		  }
		);
  	}

  }
);
}


//*******************
// EJS Filters
//*******************
var ejs = require('ejs')
  , moment = require('moment');

ejs.filters.fromNow = function(date){
  return moment(date).fromNow();
}
