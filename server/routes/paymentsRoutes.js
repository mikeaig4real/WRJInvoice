// Controllers

const {
    addPayment,
    getPayment,
} = require('../controllers/paymentController.js');

// Authentication

const {
    auth,
} = require('../middleware/authBearer');

// Router

const router = require('express').Router();

// Add , Get Payment(s)

router
    .route('/:invoiceId')
    .post(auth, addPayment)
    .get(auth, getPayment)

router.get('/', auth, getPayment);





module.exports = router;