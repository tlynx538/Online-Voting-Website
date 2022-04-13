const router = require('express').Router();
const candidateControllers = require('../controllers/candidate/candidate');
router.get('/signup',candidateControllers.signUp);

module.exports = router;