var express = require('express');
var router = express.Router();
require('dotenv').config();
const Razorpay = require('razorpay');

const { KEY_ID, KEY_SECRET } = process.env
const instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});
router.get('/success', function (req, res, next) {
  res.render('success',);
});

router.post('/create/orderId', (req, res, next) => {
  try {
    const amount = 4999 * 100
    const options = {
      amount: amount,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
      if (!err) {
        console.log(order)
        res.status(200).send(order)
      }
      else {
        res.status(400).send({
          success: false,
          msg: "something went wrong!"
        })
      }
    });

  } catch (error) {
    console.log(error)
  }
})
router.post('/api/payment/verify', async (req, res, next) => {
  const razorpayOrderId = req.body.response.razorpay_order_id
  const razorpayPaymentId = req.body.response.razorpay_payment_id
  const signature = req.body.response.razorpay_signature
  const secret = KEY_SECRET
  console.log(razorpayOrderId, razorpayPaymentId, signature, secret)
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  return res.send(validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret));
})

module.exports = router;
