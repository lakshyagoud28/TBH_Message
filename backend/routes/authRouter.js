const express = require('express');
const{singup, login,otpverification,Home}=require('../controllers/authcontroller');
//const{Home}= require('../routes/home');
const { signupValidation, loginValidation } = require('../middleware/authvalidation');
const routers= express.Router();



routers.post('/singup',signupValidation,singup); 
routers.post('/login',loginValidation,login);
routers.post('/otpverification',otpverification);
routers.post('/home',Home);
module.exports = routers;