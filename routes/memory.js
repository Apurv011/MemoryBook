const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const MemoriesController = require('../controllers/memory');

router.get('/allmemories', checkAuth, MemoriesController.getAllMemories);

router.get('/:memoryId', checkAuth, MemoriesController.getOneMemory);

router.post('/creatememory', upload.single('image'), checkAuth, MemoriesController.createOneMemory);

router.delete('/memories/delete/:memoryId', checkAuth, MemoriesController.deleteOneMemory);

module.exports = router;
