const express = require('express');
const authcontroller = require('../controller/authController');

var router = express.Router();


router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);

router.get('/test', (req, res, next) => {
  
    res.json("i am here");
  });
  



module.exports = router;