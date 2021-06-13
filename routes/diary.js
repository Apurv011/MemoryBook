const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const DiaryController = require('../controllers/diary');

router.get('/alldays', checkAuth ,DiaryController.getAllDays);

router.get('/:dayId', checkAuth, DiaryController.getOneDay);

router.post('/createday', checkAuth, DiaryController.createOneDay);

router.delete('/day/delete/:dayId', checkAuth, DiaryController.deleteOneDay);

module.exports = router;
