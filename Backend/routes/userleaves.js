const express = require('express');
const { lastlogin } = require('../controllers/auth');
const { requestleave, getallleaves, getpending, getapproved, viewrequest, respondrequest, myleaves, myapprovedleaves, mypendingleaves } = require('../controllers/userleaves')
const { protect } = require('../middleware/auth')
const router = express.Router()

router.route('/requestleave').post( requestleave);

router.route('/getallleaves').get(getallleaves)

router.route('/getpending').get( getpending)
router.route('/getapproved').get( getapproved)
router.route('/viewrequest').get( viewrequest)
router.route('/respondrequest').put( respondrequest)
router.route('/myleaves').get( myleaves)
router.route('/myapprovedleaves').get( myapprovedleaves)
router.route('/mypendingleaves').get( mypendingleaves)
router.route('/lastlogin').put(lastlogin)


module.exports = router