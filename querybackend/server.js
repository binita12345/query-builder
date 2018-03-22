var express = require('express');   //Express Web Server 
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema
global.path = require('path');
global.fs = require('fs');
var http = require('http');
var app = express();
var bodyParser  = require("body-parser");
var session      = require('express-session');



global.appRoot = path.resolve(__dirname);
global.cors = require('cors');



var url = 'mongodb://bhumi:bhumi3088@ds221609.mlab.com:21609/querybuilder' //'mongodb://bhumi:bhumi3088@ds123400.mlab.com:23400/meantest'
//"mongodb://bhumixapatel:@ds123400.mlab.com:23400/querybuilder"


//mongodb://<dbuser>:<dbpassword>@ds221609.mlab.com:21609/querybuilder
mongoose.connect(url, {server: {auto_reconnect: true,  poolSize: 10 }}, function(err) {    
    if (err) {
      console.log('errr');
     // console.log(err);
    } else {
        console.log("db connected");
    }
});

var models_path = __dirname + '/Models'
fs.readdirSync(models_path).forEach(function (file) {
		if (~file.indexOf('.js')) require(models_path + '/' + file)
})
 app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' ,
    resave: true,
    saveUninitialized: true
})); // session secret
global.User = mongoose.model('User');


/*var user = new User();
user.id = '2';
user.name = 'bhumi';
user.city = "vapi"
user.save(function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('in')
	}
});
*/

/*User.findOne({"city": "vapi","name": "bhumi"}).exec(function(err,data){ 
  if(data){
    console.log(data)
  }else{
    console.log(err)
  }
});*/

app.post('/findUser', function(req, res){
  var query = req.body.data;
  
  console.log(JSON.stringify(query))
  
  User.find(query).exec(function(err,data){ 
    if(data){
      res.send(data)
    }else{
      console.log(err)
    }
  });
})

/*stripe.customers.create({
  email: 'bhumi.patel03@yahoo.com'
}).then(function(customer) {
  return stripe.charges.create({
    amount: 3200,
    currency: 'usd',
    source: "tok_17cuLMFXW7mzC5WUOwtBMqDj",
  });
}).then(function(charge) {
  console.log('charge' + charge)
  // New charge created on a new customer 
}).catch(function(err) {
  console.log(err)
  // Deal with an error 
});*/

/*stripe.products.create({
  name: 'T-shirt',
  description: 'Comfortable gray cotton t-shirts',
  attributes: ['size', 'gender']
}, function(err, product) {
  console.log(JSON.parse(product))
  // asynchronously called
});*/


process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log(err)
  console.log("Node NOT Exiting...");
});

var server = app.listen(process.env.PORT || 6300, function() {
  console.log('Listening on port %d', server.address().port);
});