
var mysql   = require("mysql");
var express = require("express");
var md5 = require("MD5");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var connection = require("../database"); // get our config file


var userSecurityQuestionCheck = function (req, res) {

	//var em = req.body.email || req.query.email;
	var post  = {
		newPassword:req.body.newPassword,
		email:req.body.email,
		securityQuestion:req.body.securityQuestion,
		securityQuestionAnswer:req.body.securityQuestionAnswer
	}
	
	var query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ??=?";

	var table = ["User","SecurityQuestionAnswer",  md5(post.securityQuestionAnswer), "SecurityQuestion", post.securityQuestion, "email", post.email];

	query = mysql.format(query,table);

	connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {
			if(rows.length==1){
				user_id= rows[0].UserID;
				var data  = {
					Password:md5(post.newPassword)
				}
				var query = "UPDATE  ?? SET  ? WHERE ??=?";
				var table = ["User",data,"email",post.email];
				query = mysql.format(query,table);
				connection.query(query, function(err,rows){
					if(err) {
						res.json({"Error" : true, "Message" : "Error executing MySQL query"});
					} else {
						res.json({
							"Error": false,
							message: 'Password Changed',
							currUser: user_id
						});
           				 } // return info including token
           				});
			}
			else {
				res.json({"Error" : true, "Message" : "wrong email/question/answer combination"});
			}

		}
	});
}

module.exports = userSecurityQuestionCheck;
