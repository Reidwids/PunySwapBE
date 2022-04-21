var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/index');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', ctrl.index_get);

module.exports = router;
