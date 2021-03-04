const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const DiaryController = require('../controllers/diary');

router.get('/alldays', DiaryController.getAllDays);

router.get('/:dayId', DiaryController.getOneDay);

router.post('/createday', DiaryController.createOneDay);

router.delete('/day/delete/:dayId', DiaryController.deleteOneDay);

module.exports = router;
