var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "az1-ss18.a2hosting.com",
	user: "jacobsla_Admin",
	password: "JacobsLadderGT2019",
	database: "jacobsla_jacobsLadder",
    debug    :  true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;