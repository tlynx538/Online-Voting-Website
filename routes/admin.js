const router = require('express').Router();
const adminControllers = require('../controllers/admin/admin');
router.get('/',adminControllers.homePage);
router.get('/election/setup',adminControllers.electionControl);
router.get('/election/setup/start',adminControllers.startElection);
router.get('/election/setup/stop',adminControllers.endElection);
router.get('/election/results',adminControllers.electionResultView);
router.get('/seed',adminControllers.seed);
module.exports = router;