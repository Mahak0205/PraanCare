const { spawn } = require('child_process');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function runPythonSleepPrediction(inputArray) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../python_codes/sleep/sleep_pred.py');

    const python = spawn('python', [scriptPath, ...inputArray.map(String)]);

    let result = '';
    let error = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
      console.error("🐍 stderr (sleep):", data.toString());
    });

    python.on('close', (code) => {
      if (code !== 0 || error) {
        reject(error || `Python sleep predictor exited with code ${code}`);
      } else {
        resolve(result.trim());
      }
    });
  });
}

exports.predictSleepDisorder = async (req, res) => {
  try {
    const {
      sleepDuration,
      qualityOfSleep,
      physicalActivity,
      stressLevel,
      bmiCategory,
      heartRate,
      dailySteps,
      systolicBP,
      diastolicBP,
      occupation
    } = req.body;

    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const inputArray = [
      user.gender,
      user.age,
      occupation,
      sleepDuration,
      qualityOfSleep,
      physicalActivity,
      stressLevel,
      bmiCategory,
      heartRate,
      dailySteps,
      systolicBP,
      diastolicBP
    ];

    console.log("📤 Sleep prediction input:", inputArray);

    const prediction = await runPythonSleepPrediction(inputArray);
    res.json({ prediction });
  } catch (err) {
    console.error("❌ Sleep Prediction Error:", err);
    res.status(500).json({ error: err.toString() });
  }
};
