const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const voterControllers = require('../controllers/voters/voters');
router.get('/signup',voterControllers.getSignUp);
router.post('/signup',voterControllers.postSignUp);
router.get('/vote',voterControllers.getVote);
router.post('/signin',voterControllers.signIn);
router.get('/logout',voterControllers.logout);
router.get('/upload/images',voterControllers.getImagesUpload);
router.post('/upload/images',voterControllers.postImageUpload);
// router.get('/upload/landing',voterControllers.tempLandingPage);
router.get('/voting',voterControllers.getVotingPage);
router.get('/vote/:candidate_id',voterControllers.getVote);
module.exports = router;