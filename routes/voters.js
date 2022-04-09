const router = require('express').Router();
const express = require('express');
const voterControllers = require('../controllers/voters/voters');
router.get('/signup',voterControllers.signUp);
router.get('/vote',voterControllers.vote);
module.exports = router;