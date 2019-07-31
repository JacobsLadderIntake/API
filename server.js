var express = require("express");
var http = require('http');
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var cors = require('cors');
var config = require('./config');
var config = require('./database');  

/*
var corsOptions = {
  origin: 'https://master.d3s6zkvpjflghi.amplifyapp.com/#/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/

var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');
var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');
var findUser = require('./middleware/findUser');
var findUsersChildren = require('./middleware/findUsersChildren');
var findAllChildren = require('./middleware/findAllChildren');
var findChildsForm = require('./middleware/findChildsForm');
var addNewChild = require('./middleware/addNewChild');
var sendChildsForm = require('./middleware/sendChildsForm');
var userSecurityQuestionCheck = require('./middleware/userSecurityQuestionCheck');


var port = process.env.PORT || 4200;

//var twilio = require('twilio');
var app  = express();
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log('Express server listening on port ' +port);
});

app.use(cors())
app.options('/userlogin', cors())

app.post('/signup', addNewUser);
app.post('/userlogin', cors(), userLoginCheck);
app.post('/userSecurityQuestion',userSecurityQuestionCheck);
app.post('/children/',addNewChild);



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
//apiRoutes.post('/children/',addNewChild);


app.use('/api', apiRoutes);