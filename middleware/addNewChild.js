var mysql   = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var connection = require("../database");

var addNewChild = function(req,res,next){
	var valuesRaw = req.body
	var valuesRefined = ''
	valuesParsed = valuesRaw
	for(var index in valuesParsed){
		valuesRefined += index + '="'+valuesParsed[index]+'",';
	}
	valuesRefined = valuesRefined.substring(0,valuesRefined.length-1);
	
	
	var query = "INSERT INTO Child SET " + valuesRefined + " ON DUPLICATE KEY UPDATE " + valuesRefined;
	
	connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		} else {
			res.json({"Error" : false, "Message" : "Success"});
		}
	});
}
module.exports = addNewChild;
