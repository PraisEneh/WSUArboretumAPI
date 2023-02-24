const express = require('express');
const router = express.Router();
const rootController = require('../controllers/rootControllers');

router.get('/getTours', rootController.handleGetTours);
router.get('/getTour', rootController.handleGetTour);


module.exports = router;