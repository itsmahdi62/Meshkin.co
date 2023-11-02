const express = require('express')
const router = express.Router();
const tourController = require('../controllers/tourController')


router.route('/top-5-cheap').get(tourController.aliasTopTours ,tourController.getAllTours)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthley-plan/:year').get(tourController.aliasTopTours ,tourController.getMonthlyPlan)

router.route('/').get(tourController.getAllTours).post(tourController.createTour)
router.route('/:id').get(tourController.getTour).patch(tourController.patchTour).delete(tourController.deleteTour);

module.exports = router