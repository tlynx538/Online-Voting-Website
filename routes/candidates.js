const router = require('express').Router();
const candidateControllers = require('../controllers/candidate/candidate');
router.get('/signup',candidateControllers.getSignUp);
router.post('/signup',candidateControllers.postSignUp);
module.exports = router;