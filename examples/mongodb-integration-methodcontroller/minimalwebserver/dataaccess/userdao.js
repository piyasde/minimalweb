var config = require('./dataconfig/config');
var mongodburl = process.env.MONGODB_URL ;
var collections = ["users"];
var mongojs = require('mongojs');
//var db = require("mongojs").connect(mongodburl, collections);
var db = mongojs(mongodburl);
var users = db.collection('minimalwebusers');

function insertUser(jsonVar, cb) {
  var jsonData = JSON.parse(jsonVar);
  users.save({email: jsonData.email, password: jsonData.password, username: jsonData.username}, function(err, saved) {
  	if( err || !saved ) 
		return cb(err,'Internal Server Error');
  	else 
		return cb(null,JSON.stringify(saved));
  });
}

function getUser(cb) {
  users.find(function(err, usersrec) {
	if( err || !usersrec) 
	   return cb(err,'Internal Server Error');
	else 
	{
		if (usersrec == '')
			return cb(null,JSON.stringify("[]"));
		str='[';
		usersrec.forEach( function(user) {
			str = str + '{ "name" : "' + user.username + '","email" : "'+ user.email +'"},' ;
		});
		str = str.trim();
		str = str.substring(0,str.length-1);
		str = str + ']';
		return cb(null,str);
	}
  });
}

function getSingleUser(email, cb) {
  users.find({"email":email},function(err, usersrec) {
	if( err || !usersrec) 
	   return cb(err,'Internal Server Error');
	else 
	{
		//console.log('in getSingle User');
		//console.log("usersrec is -->>"+usersrec+"=====");
		if (usersrec == '')
			return cb(null,JSON.stringify("[]"));
		str='[';
		usersrec.forEach( function(user) {
			str = str + '{ "name" : "' + user.username + '","email" : "'+ user.email +'"},' ;
		});
		str = str.trim();
		str = str.substring(0,str.length-1);
		str = str + ']';
		return cb(null,JSON.stringify(str));
	}
  });	
}


function removeUser(email, cb) {
  users.remove({"email":email},true,function(err,lastErrorObject) {
	if( err) 
	   return cb(err,'Internal Server Error');
	return cb(null);
	
  });
}

module.exports.insertUser = insertUser;
module.exports.getUser = getUser;
module.exports.removeUser = removeUser;
module.exports.getSingleUser = getSingleUser;
