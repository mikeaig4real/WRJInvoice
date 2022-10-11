// Controllers

const {
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController');

// Authentication

const {
    auth,
} = require('../middleware/authBearer');

// Router

const router = require('express').Router();

// Add , Get, Update, Delete Single Customer(s)

router
    .route('/')
    .post(auth, addCustomer)
    .get(auth, getCustomer);

router
    .route('/:customerId')
    .get(auth, getCustomer)
    .patch(auth, updateCustomer)
    .delete(auth, deleteCustomer);

    


module.exports = router;