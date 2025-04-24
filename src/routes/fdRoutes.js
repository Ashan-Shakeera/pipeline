const express = require('express');
const fdController = require('../controllers/fdController');

const router = express.Router();

router.post('/', fdController.calculateFD);

module.exports = router;