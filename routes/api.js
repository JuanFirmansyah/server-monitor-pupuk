const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.get('/get-data', apiController.getAllData);
module.exports = router;
