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
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // }
    // fileFilter: fileFilter
});

const NotesController = require('../controllers/note');

router.get('/allnotes', NotesController.getAllNotes);

router.get('/:noteId', NotesController.getOneNote);

router.post('/createnote', upload.single('image'), NotesController.createOneNote);

router.delete('/notes/delete/:noteId', NotesController.deleteOneNote);

module.exports = router;
