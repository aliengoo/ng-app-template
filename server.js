// simple express server for testing
var express = require('express');
var bodyParser = require('body-parser');

// https://www.npmjs.org/package/faker#readme
var faker = require('faker');

var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Yay!  The connection is open');
});

// MONGODB api - just used for simple testing - prefer schemas
// for mongo db api, grab the collection
app.param('collectionName', function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

app.get('/collections/:collectionName', function (req, res) {

  var callback = function (err, results) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(results);
    }
  };

  req.collection.find({}).toArray(callback);
});

app.post('/collections/:collectionName', function (req, res) {

  req.collection.save(req.body, function (err, result) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(result);
    }
  });
});

// TODO : Add your witchcraft here...
app.get('/faker/user', function (req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

app.get('/faker/any', function (req, res) {
  var any = faker.helpers.createCard();
  res.json(any);
});


app.listen(3000, function () {
  console.log('App listening on localhost:3000');
});
