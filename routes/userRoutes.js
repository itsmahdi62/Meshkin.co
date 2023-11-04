const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post('/signup', authController.SignUp)

router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)


router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.patchUser)
    .delete(userController.deleteUser);

module.exports = router;