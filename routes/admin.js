const router = require('express').Router();
const adminControllers = require('../controllers/admin/admin');
router.get('/',adminControllers.homePage);

module.exports = router;