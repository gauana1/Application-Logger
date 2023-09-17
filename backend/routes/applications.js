const express = require('express');

const {
    getApplications,
    getApp,
    getAppsWithCodingChallenges,
    getAppsWithInterviews,
    getAppsWithNoStatus,
    getAppsWithNoRejections,
    createApplication, 
    deleteApp, 
    updateApp} = require('../controllers/applicationController')

const requireAuth = require('../middleware/requireAuth'); 

//require auth to access applications
const router  = express.Router();

router.use(requireAuth)
//Get all Apps
router.get('/', getApplications);
// Post apps on database
router.post('/', createApplication);

//Get single application on database
router.get('/:id', getApp);
//Delete single app on database
router.delete('/:id', deleteApp);

//update apps
router.patch('/:id', updateApp);
//Get all Apps with Hackkerank
router.get('/coding-challenge', getAppsWithCodingChallenges);

//Get all Apps with Interviews
router.get('/interviews', getAppsWithInterviews);

//Get all Apps without Rejctions
router.get('/no-rejection', getAppsWithNoRejections);

//Get all Apps with no status
router.get('/no-status', getAppsWithNoStatus);

module.exports = router