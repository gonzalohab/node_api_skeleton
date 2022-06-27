const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { googleSignIn } = require('../controllers/googleSignIn');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login'
    , check('email', 'Email required').isEmail()
    , check('password', 'Password required').not().isEmpty()
    , validateFields
    , login);

router.post('/google'
    , check('id_token', 'id_token is required').not().isEmpty()
    , validateFields
    , googleSignIn);

module.exports = router;
