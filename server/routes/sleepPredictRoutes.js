const express = require('express');
const router = express.Router();
const { predictSleepDisorder } = require('../controllers/sleepPredictController');
const { auth } = require('../middleware/authMiddleware');

router.post('/predictsleep', auth, predictSleepDisorder);

module.exports = router;
