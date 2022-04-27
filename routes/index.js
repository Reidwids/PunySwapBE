var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/index');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', ctrl.index_get);
router.get('/allCoins', ctrl.allCoins_get);
router.post('/coinData', ctrl.coinData_get);
router.post('/addBookmark', ctrl.addBookmark_post);
router.post('/removeBookmark', ctrl.removeBookmark_post);
router.post('/addSwap', ctrl.addSwap_post);
router.post('/removeSwap', ctrl.removeSwap_post);
router.post('/isBookmarked', ctrl.isBookMarked_post);
router.post('/swapIsBookmarked', ctrl.swapIsBookMarked_post);

module.exports = router;
