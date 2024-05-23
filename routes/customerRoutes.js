const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getData);

router.get('/customer', async (req, res) => { // Makes the customer have to enter their ID
    const customerId = req.query.customerId;
    await customerController.getData(req, res);
});
router.post('/add-comment', customerController.addComment);


module.exports = router;
