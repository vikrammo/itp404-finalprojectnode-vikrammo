var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors');
var bodyParser = require('body-parser')
var Twitter = require('twitter');

var DB_NAME = 'mohan'
var DB_USER = 'mohan'
var DB_PASSWORD = 'ember node 2016'
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{

  dialect: 'mysql',
  host: 'itp460.usc.edu'

});

var Product = sequelize.define('products', {

name: {
type: Sequelize.STRING

},
description: {
  type: Sequelize.STRING

},

price: {

  type: Sequelize.INTEGER
},
url: {

  type: Sequelize.STRING
}


},
 {
  timestamps: false
});

var Site = sequelize.define('othersources', {

siteName: {
type: Sequelize.STRING

},
siteURL: {
  type: Sequelize.STRING

},

siteDescription: {

  type: Sequelize.INTEGER
},

},
 {
  timestamps: false
});

var Tutorial = sequelize.define('tutorials', {

name: {
type: Sequelize.STRING

},
url: {
  type: Sequelize.STRING

},
},
 {
  timestamps: false
});

app.use(cors());
app.use(bodyParser());

app.get('/api/products', function (request, response) {

  var promise = Product.findAll();
  promise.then(function(products){
    response.json(products);
  });
})

app.get('/api/othersources', function (request, response) {

  var promise = Site.findAll();
  promise.then(function(sites){
    response.json(sites);
  });
})

app.get('/api/tutorials', function (request, response) {

  var promise = Tutorial.findAll();
  promise.then(function(videos){
    response.json(videos);
  });
})

app.get('/api/tweets', function(request, response) {
  var client = new Twitter({
    consumer_key: 'eOD8q1TE1kPC94qqLqLaOcR0q',
    consumer_secret: 'Mw5gFhnxlHHtp3vidotXZ864tRiffEVnC4iCrdjxohO6AZcNUo',
    access_token_key: '24509140-Z6Se2tfZhYqgMccaTxhgTcOod8q0kTQCKf86N69Iz',
    access_token_secret: 'ggJ8PX8odT6ddaNQossD6Bj2AJ4P9XwH3W6zXiLst3dl0'
  });

  var params = { screen_name: 'coupons'};
  client.get('statuses/user_timeline', params, function(error, tweets) {
    if (!error) {
      response.json(tweets);
    }
  });
});

app.listen(process.env.PORT || 3000)
