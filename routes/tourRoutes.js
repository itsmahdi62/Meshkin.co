const express = require('express')
const router = express.Router();
const tourController = require('../controllers/tourController')

router.route('/').get(tourController.getAllTour).post(tourController.createTour)
router.route('/:id').get(tourController.getTour).patch(tourController.patchTour).delete(tourController.deleteTour);

module.exports = router