const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeControllers');

router.get('/getOneTree', treeController.handleGetOneTree);
router.get('/getAllTrees', treeController.handleGetAllTrees);
router.get('/getTreeTour', treeController.handleGetTour);


module.exports = router;