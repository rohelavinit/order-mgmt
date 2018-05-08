var express = require('express');
var router = express.Router();
var formSubmitAction = require('../common/formSubmitAction')
var {saveCustomer, searchCustomer} = require('../common/customerAction')

router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/login', function(req, res, next) {
  formSubmitAction(req.body, (formActionStatus)=>{
    res.send(formActionStatus);
  })
});

router.post('/saveCustomer', function(req, res, next) {
  saveCustomer(req.body, ()=>{
    res.send({status: 200});
  })
});

router.post('/searchCustomer', function(req, res, next) {
  searchCustomer(req.body, (customerData)=>{
    res.send(customerData);
  })
});

module.exports = router;
