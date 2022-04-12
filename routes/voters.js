const router = require('express').Router();
const express = require('express');
const voterControllers = require('../controllers/voters/voters');
router.get('/signup',voterControllers.signUp);
router.get('/vote',voterControllers.vote);
// temporary route
//router.get('/error',voterControllers.voted_already);
module.exports = router;