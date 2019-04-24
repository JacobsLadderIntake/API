var mysql = require('mysql');



/*
var db_config = {
	host: "az1-ss18.a2hosting.com",
	user: "jacobsla_Admin",
	password: "JacobsLadderGT2019",
	database: "jacobsla_jacobsLadder",
    debug    :  true
}
*/
var db_config = {
	host:"jacobsladderintaketeam.cik1yin3pif1.us-east-1.rds.amazonaws.com",
	user: "intaketeam",
	password: "IwantanA123",
	database: "jacobsla_jacobsLadder",
    debug    :  true	
}

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused
												  
												  
	console.log(db_config)
												  
												  
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
	  handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = connection;

/*
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
*/