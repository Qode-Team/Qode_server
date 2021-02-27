const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verify');
const {getHashTages, getBoards, getSearch, sortPopularity} = require('../../controller/search.router')

router.get('/', getSearch);
router.get('/hashtag', getHashTages);
router.get('/board', getBoards);
router.get('/sort/popularity', sortPopularity);

module.exports = router;