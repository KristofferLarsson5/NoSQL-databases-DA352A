const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getData);
router.post('/add-customer', employeeController.addCustomer);
router.post('/add-recipe', employeeController.addRecipe);
router.post('/remove-customer', employeeController.removeCustomer);
router.post('/remove-recipe', employeeController.removeRecipe);

module.exports = router;
