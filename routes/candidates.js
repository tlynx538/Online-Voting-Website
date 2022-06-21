const router = require('express').Router();
const candidateControllers = require('../controllers/candidate/candidate');
router.get('/signup',candidateControllers.getSignUp);
router.post('/signup',candidateControllers.postSignUp);
router.post('/signin',candidateControllers.postSignIn);
router.get('/logout',candidateControllers.logout);
module.exports = router;