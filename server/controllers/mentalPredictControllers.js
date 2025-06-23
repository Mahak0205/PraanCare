const { spawn } = require('child_process');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // import your User model

function runPythonPrediction(inputArray, type) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../python_codes/mental_wellbeing/mental_pred.py');
    
    console.log(`📤 Running Python script for "${type}"`);
    console.log("📥 Input data:", inputArray);  // 👈 add this
    
    const python = spawn('python', [scriptPath, type, JSON.stringify(inputArray)]);

    let result = '';
    let error = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      error += data.toString();
      console.error("🐍 stderr:", data.toString());  // 👈
    });

    python.on('close', (code) => {
      if (code !== 0 || error) {
        console.error(`❌ Python ${type} exited with code ${code}`);
        reject(error || `Exited with code ${code}`);
      } else {
        console.log(`✅ Python ${type} result:`, result.trim());
        resolve(result.trim());
      }
    });
  });
}


async function buildInputData(req, res) {
  const fourteenResponses = req.body.answers;
  console.log("🧠 Received answers:", fourteenResponses); // 👈

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.warn("❗ Missing token");
    return res.status(401).json({ msg: 'Missing token' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const user = await User.findById(userId);
  if (!user) {
    console.warn("❗ User not found:", userId);
    return res.status(404).json({ msg: 'User not found' });
  }

  const traits = [
    user.personality["Extraverted - enthusiastic"],
    user.personality["Critical - quarrelsome"],
    user.personality["Dependable - self-disciplined"],
    user.personality["Anxious - easily upset"],
    user.personality["Open to new experiences - complex"],
    user.personality["Reserved - quiet"],
    user.personality["Sympathetic - warm"],
    user.personality["Disorganized - careless"],
    user.personality["Calm - emotionally stable"],
    user.personality["Conventional - uncreative"]
  ];

  const demographics = [
    user.education,
    user.urban,
    user.gender,
    user.age,
    user.religion,
    user.race,
    user.married,
    user.familysize,
    user.major
  ];

  const fullData = [...fourteenResponses, ...traits, ...demographics];
  console.log("📦 Final input array length:", fullData.length); // Should be 33
  return fullData;
}


exports.predictDepression = async (req, res) => {
  try {
    const inputData = await buildInputData(req, res);
    const prediction = await runPythonPrediction(inputData, 'depression');
    res.json({ prediction });
  } catch (err) {
    console.error("❌ Depression Prediction Error:", err);
    res.status(500).json({ error: err.toString() });
  }
};

exports.predictAnxiety = async (req, res) => {
  try {
    const inputData = await buildInputData(req, res);
    const prediction = await runPythonPrediction(inputData, 'anxiety');
    res.json({ prediction });
  } catch (err) {
    console.error("❌ Anxiety Prediction Error:", err);
    res.status(500).json({ error: err.toString() });
  }
};

exports.predictStress = async (req, res) => {
  try {
    const inputData = await buildInputData(req, res);
    const prediction = await runPythonPrediction(inputData, 'stress');
    res.json({ prediction });
  } catch (err) {
    console.error("❌ Stress Prediction Error:", err);
    res.status(500).json({ error: err.toString() });
  }
};
