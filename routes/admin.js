const router = require('express').Router();
const adminControllers = require('../controllers/admin/admin');
router.get('/',adminControllers.homePage);
router.get('/seed',adminControllers.seed);
module.exports = router;