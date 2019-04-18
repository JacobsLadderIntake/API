var express = require("express");
var http = require('http');
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var config = require('./config');
var config = require('./database');  

var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');
var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');
var findUser = require('./middleware/findUser');
var findUsersChildren = require('./middleware/findUsersChildren');
var findAllChildren = require('./middleware/findAllChildren');
var findChildsForm = require('./middleware/findChildsForm');
var sendChildsForm = require('./middleware/sendChildsForm');
var userSecurityQuestionCheck = require('./middleware/userSecurityQuestionCheck');


var port = process.env.PORT || 4200;

//var twilio = require('twilio');
var app  = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log('Express server listening on port ' +port);
});

app.post('/signup', addNewUser);
app.post('/userlogin', userLoginCheck);
app.post('/userSecurityQuestion',userSecurityQuestionCheck);




var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
//route middleware to verify a token 
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
apiRoutes.get('/users', findAllUsers);
apiRoutes.get('/users/:id',findUser);
apiRoutes.get('/users/:id/children', findUsersChildren);
apiRoutes.get('/children',findAllChildren);
apiRoutes.get('/children/:childID/forms/:formName',findChildsForm);
apiRoutes.post('/children/:childID/forms/:formName',sendChildsForm);

app.use('/api', apiRoutes);

//app.use(bodyParser());

// function REST(){
//     var self = this;
//     self.connectMysql();
// };

// REST.prototype.connectMysql = function() {
//     var self = this;
//     var pool      =    mysql.createPool({
//         connectionLimit : 100,
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'lyive',
//         debug    :  true
//     });
//     pool.getConnection(function(err,connection){
//         if(err) {
//           self.stop(err);
//         } else {
//           self.configureExpress(connection);
//         }
//     });
// }

//app.post('/userlogin', userLoginCheck);



// REST.prototype.configureExpress = function(connection) {
//       var self = this;
//       app.use(bodyParser.urlencoded({ extended: true }));
//       app.use(bodyParser.json());
//       var router = express.Router();
//       app.use('/api', router);
//       router.use(verifyToken);
//       var rest_router = new rest(router,connection,md5);
//       self.startServer();
// }

// REST.prototype.startServer = function() {
//       app.listen(4200,function(){
//           console.log("All right ! I am alive at Port 4200.");
//       });
// }

// REST.prototype.stop = function(err) {
//     console.log("ISSUE WITH MYSQL \n" + err);
//     process.exit(1);
// }

// new REST();
