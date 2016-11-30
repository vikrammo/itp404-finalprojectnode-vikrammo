var express = require('express')
var app = express()
var Sequelize = require('sequelize');

var DB_NAME = 'mohan'
var DB_USER = 'mohan'
var DB_PASSWORD = 'ember node 2016'
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{

  dialect: 'mysql',
  host: 'itp460.usc.edu'

});

var Song = sequelize.define('products', {

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

app.get('/api/products', function (request, response) {

  var promise = Song.findAll();
  promise.then(function(songs){
    response.json(songs);
  });
})

app.listen(3000)
