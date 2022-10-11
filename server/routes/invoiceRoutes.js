// Controllers

const {
    addInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController.js');

// Authentication

const {
    auth,
} = require('../middleware/authBearer');

// Router

const router = require('express').Router();

// Add , Get, Update, Delete Single Invoice(s)

router
    .route('/:customerId')
    .post(auth, addInvoice);

router.get('/', auth, getInvoice);

router
    .route('/:invoiceId')
    .get(auth, getInvoice)
    .patch(auth, updateInvoice)
    .delete(auth, deleteInvoice);




module.exports = router;