import express from 'express';
const userController = require('../controllers/UserController');
const router = express.Router();

router.route('/login')
    .post(userController.loginUser)

router.route('/register')
    .post(userController.registerUser)

module.exports = router;