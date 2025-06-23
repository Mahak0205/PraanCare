const express = require('express');
const router = express.Router();
const {predictDepression, predictAnxiety, predictStress} = require('../controllers/mentalPredictControllers');

router.post('/depression/predict', predictDepression);
router.post('/anxiety/predict', predictAnxiety);
router.post('/stress/predict', predictStress);

module.exports = router;