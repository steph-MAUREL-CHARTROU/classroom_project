const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../services/auth.service');



router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/me', auth, userController.getInfo)


module.exports = router;