// Require express
var express = require('express');
var bodyParser = require('body-parser')

// Create an instance of express
var app = express();
var PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Start server
app.listen(PORT, function(){
  console.log(`Listening on ${PORT}`);
});