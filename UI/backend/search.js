/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



var mysql = require('mysql');
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const con = mysql.createConnection({
  host: "motorbike-rental.cjvrqjdfqozx.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "Yeetus475",
  port: 3306,
  database: 'Motorbike_Rental_DB'
});

/**********************
 * Example get method *
 **********************/

app.get('/search', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/search', function(req, res) {
  // Add your code here
  const searchFilters = req.body.searchFilters;
  
  if (searchFilters.input.length > 0) {
    let q = 'SELECT * FROM PRODUCT ';
    q += `WHERE ProductName LIKE '%${searchFilters.input}%'` 

    if (searchFilters.type !== 'Category' && searchFilters.type !== 'None') {
        q += ` AND ProductType = '${searchFilters.type}'`;
    }
    
    if (searchFilters.brand !== 'None') {
        q += ` AND ProductBrand = '${searchFilters.brand}'`;
    }

    if (searchFilters.color !== 'None') {
        q += ` AND ProductColor = '${searchFilters.color}'`;
    }

    if ( searchFilters.priceMin > -1) {
        q += ` AND ProductPrice >= ${searchFilters.priceMin}`;
    }

    if (searchFilters.priceMax > -1) {
        q += ` AND ProductPrice <= ${searchFilters.priceMax}`;
    }
    
    q += ' AND ProductQuantity > 0';
    q += ` ORDER BY ${searchFilters.sortOrder}`;
    q += ';';
    
    con.query(q, (err, result) => {
        if (err) {
            res.send({err: err});
        }
        if (result) {
            res.send(result);
        }
    });
  }
});

app.post('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/search', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/search', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
