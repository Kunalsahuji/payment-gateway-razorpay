var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const Razorpay = require('razorpay');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});
const { KEY_ID, KEY_SECRET } = process.env

const instance = new Razorpay({ 
  key_id: process.env.KEY_ID, 
  key_secret: process.env.KEY_SECRET 
})

router.post('/create/orderId', (req, res, next) => {
  // const instance = new Razorpay({ key_id: 'rzp_test_VlF8phleov2f3b', key_secret: 'sFbiDEoU73PwUDIdVTJKIWIR' })

  const options = {
    amount: 459900,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order)
  });
})

module.exports = router;
