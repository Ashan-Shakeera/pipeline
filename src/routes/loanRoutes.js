const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.post('/', loanController.calculateEMI);

module.exports = router;