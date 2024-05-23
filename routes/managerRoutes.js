const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.get('/', managerController.getAllData);
router.post('/add-employee', managerController.addEmployee);
router.post('/add-customer', managerController.addCustomer);
router.post('/add-recipe', managerController.addRecipe);
router.post('/remove-employee', managerController.removeEmployee);
router.post('/remove-customer', managerController.removeCustomer);
router.post('/remove-recipe', managerController.removeRecipe);

module.exports = router;
