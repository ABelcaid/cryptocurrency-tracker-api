const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')





router.post('/add', userController.addUser);








module.exports = router;