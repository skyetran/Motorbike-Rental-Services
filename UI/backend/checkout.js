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

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/checkout-dev', function(req, res) {
  // Add your code here
  const order = req.body.order;
  const address = order.shipping;
  let setAddr = 'INSERT INTO ADDRESS VALUES (AddressID, Address1, City, State, PostalCode, Country) ';
  setAddr += `(${getAddr} ,'${address.street}', '${address.town_city}', '${address.county_state}', ${address.postal_zip_code}, '${address.country}');`;
  con.query(setAddr);

  let cl = 'INSERT INTO CUSTOMER_LOCATES(CustomerID, AddressID) VALUES';
  cl += `(${order.customer.customerID}, ${addrID});`;
  con.query(cl);

  let q = 'INSERT INTO ORDERS(OrderID, OrderDate, SaleTax, ShippingOption, ShippingDate, ShippingTime, CartID, CardNumber) Values';
  q += `(${orderID}, curdate(), ${order.cart.subtotal*0.1}, '${order.fulfillment.shippingOption}', CURDATE() + INTERVAL 7 DAY, CURTIME(), ${order.cart.cid}, ${order.payment.cardNumber});`;
  con.query(q, (err, result) => {
    if (err) {
      res.send({err: 'failed to place order'});
    } else {
      res.send({orderID: orderID});
    }
  });
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
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
