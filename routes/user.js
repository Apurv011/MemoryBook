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

const UserController = require('../controllers/user');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.logIn);

router.get('/:userId', checkAuth, UserController.getOneUser);

router.patch('/:userId', checkAuth, UserController.editUser);

router.patch('/withProfilePic/:userId', upload.single('image'), checkAuth, UserController.editUserWithPic);

router.delete('/:userId', checkAuth, UserController.deleteUser);

module.exports = router;
