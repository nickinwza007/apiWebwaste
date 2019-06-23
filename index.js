/* โหลด Express มาใช้งาน */
var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
const jwt=require('jsonwebtoken');
const key='KEY';

var waste = require('./waste');
var users = require('./users');

var port = process.env.PORT || 7777;
//parse
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.set('view engine','ejs');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

/* Routing */
app.get('/', function (req, res) {
    console.log('homestart ');
});


function verifyToken(req, res, next) {
    var token = req.body.token;
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, key, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }

// --------------------------- Rout waste----------------------------
app.post('/waste/createWaste',function(req,res){
	waste.createWaste(req,res);
});
app.post('/waste/getWaste',verifyToken, function(req, res, next){
    // checkToken(req, res);
	waste.getWaste(req,res);
});

app.post('/waste/updateWaste',function(req,res){
	waste.updateWaste(req,res);
});

app.post('/waste/deleteWaste',function(req,res){
	waste.deleteWaste(req,res);
});



// --------------------------- Rout payment----------------------------



app.post('/payment/createnews',function(req,res){
	waste.createpayment(req,res);
});
app.post('/payment/getnewst',function(req,res){
	waste.getpayment(req,res);
});

app.post('/payment/updatenews',function(req,res){
	waste.updatepayment(req,res);
});

app.post('/payment/deletenews',function(req,res){
	waste.deletepayment(req,res);
});


// --------------------------- Rout News----------------------------

app.post('/news/createnews',function(req,res){
	waste.createnews(req,res);
});
app.post('/news/getnews',function(req,res){
	waste.getnews(req,res);
});

app.post('/news/updatenews',function(req,res){
	waste.updatenews(req,res);
});

app.post('/news/deletenews',function(req,res){
	waste.deletenews(req,res);
});


//------------------------ root users
app.post('/users/login',function(req,res){
	users.login(req,res);
});


app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});

