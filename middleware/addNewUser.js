
var mysql   = require("mysql");
var express = require("express");
var md5 = require("MD5");
var connection = require("../database");


 var addNewUser = function(req,res, next){
 	var date = new Date();
    var post  = {
      //first_name:req.body.first_name,
      //last_name:req.body.last_name,
	  UserID:req.body.UserID,
      email:req.body.email,
      password:md5(req.body.password),
	  UserFirstName:req.body.userFirstName,
	  UserLastName:req.body.userLastName,
	  SecurityQuestion:req.body.securityQuestion,
	  SecurityQuestionAnswer:md5(req.body.securityQuestionAnswer),
	  IsAdmin:req.body.isAdmin
      //dob:req.body.dob,
      //latitude:req.body.latitude,
      //longitude:req.body.longitude,
      //device_type:req.body.device_type,
      //device_token:req.body.device_token,
     // time_zone:req.body.time_zone
      
  };
  console.log(post);
  		var query = "SELECT email FROM ?? WHERE ??=?";

		var table = ["User", "email", post.email];

		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query"});
		}
		else {

		if(rows.length==0){

			var query = "INSERT INTO  ?? SET  ?";
			var table = ["User"];
			query = mysql.format(query,table);
			connection.query(query, post, function(err,rows){
				if(err) {
					res.json({"Error" : true, "Message" : "Error executing MySQL query"});
				} else {
					res.json({"Error" : false, "Message" : "Success"});
				}
			});

		}
		else{
			res.json({"Error" : false, "Message" : "Email Id already registered"});
		}
		}
    });
	}

   module.exports = addNewUser;

