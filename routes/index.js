var express = require('express');
var router = express.Router();
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var registerobj = Joi.object({
  name:Joi.string().min(3).max(11).required(),
  email:Joi.string().email().required(),
  password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
})

router.post('/adddata', validator.body(registerobj), async function (req, res, next) {
  try {
    res.status(401).json({
      status: 'success'
    })
  }
  catch (err) {
    res.status(401).json({
      status: 'alert',
      err
    })
  }
});

module.exports = router;
