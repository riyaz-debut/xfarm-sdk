require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swig = require('swig-security-fix');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine('html', swig.renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/fabric', require("./src/fabric/fabric-ca-client.route"));

const RouteType = require('./middleware/route-type');
const rType = new RouteType();

// // Authenticator
// app.use(function (req, res, next) {
// 	var auth;

// 	// check whether an autorization header was send
// 	if (req.headers.authorization) {
// 		// only accepting basic auth, so:
// 		// * cut the starting "Basic " from the header
// 		// * decode the base64 encoded username:password
// 		// * split the string at the colon
// 		// -> should result in an array
// 		auth = new Buffer(req.headers.authorization.substring(6), "base64")
// 			.toString()
// 			.split(":");
//     // Basic eGZhcm11c2VyOnhmYXJtcHc=
//     // [ 'xfarmuser', 'xfarmpw' ]
// 		// use Buffer.from in with node v5.10.0+
// 		// auth = Buffer.from(req.headers.authorization.substring(6), 'base64').toString().split(':');
// 	}

// 	// checks if:
// 	// * auth array exists
// 	// * first value matches the expected user
// 	// * second value the expected password
// 	if (
// 		!auth ||
// 		auth[0] !== process.env.AUTH_USER ||
// 		auth[1] !== process.env.AUTH_PW
// 	) {
// 		// any of the tests failed
// 		// send an Basic Auth request (HTTP Code: 401 Unauthorized)
// 		res.statusCode = 401;
// 		// MyRealmName can be changed to anything, will be prompted to the user
// 		res.setHeader("WWW-Authenticate", 'Basic realm="MyRealmName"');
// 		// this will displayed in the browser when authorization is cancelled
// 		res.end("Unauthorized");
// 	} else {
// 		// continue with processing, user was authenticated
// 		next();
// 	}
// });

// check for wallet exists

const CAClient = require('./src/fabric/CAClient');
let CAClientController = new CAClient();

const fs = require("fs")

async function walletCheck(){ 
  try {
    if (fs.existsSync("./wallet")) {
      console.log("wallet exists")
      
    } else {
      console.log("Wallet doest not exists. Please enroll admin.")
      let adminCheck = await CAClientController.registerAdmin();
      console.log("adminCheck is ",adminCheck)
   
      let adminUserCheck = await CAClientController.registerUser();
      console.log("result 2 is ",adminUserCheck)
    } 
  } catch(e) {
    console.log("An error occurred.")
    return e
  }
}


walletCheck()

app.use('/user', rType.user, require("./src/chaincode/chaincode-route"));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("server is running")
module.exports = app;