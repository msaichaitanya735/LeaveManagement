const express = require('express');
const { lastlogin } = require('../controllers/auth');
const { requestleave, getallleaves, getpending, getapproved, viewrequest, respondrequest, myleaves, myapprovedleaves, mypendingleaves } = require('../controllers/userleaves')
const { protect } = require('../middleware/auth')
const router = express.Router()

router.route('/requestleave').post(protect,requestleave);

router.route('/getallleaves').get(protect,getallleaves)

router.route('/getpending').get(protect,getpending)
router.route('/getapproved').get(protect,getapproved)
router.route('/viewrequest').get(protect,viewrequest)
router.route('/respondrequest').put(protect,respondrequest)
router.route('/myleaves').get(protect,myleaves)
router.route('/myapprovedleaves').get(protect,myapprovedleaves)
router.route('/mypendingleaves').get(protect,mypendingleaves)
router.route('/lastlogin').put(lastlogin)


module.exports = router