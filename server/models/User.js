const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  age: Number,
  gender: Number,
  race: Number,
  religion: Number,
  education: Number,
  urban: Number,
  familysize: Number,
  married: Number,
  major: Number,

  personality: {
    "Extraverted - enthusiastic": Number,
    "Critical - quarrelsome": Number,
    "Dependable - self-disciplined": Number,
    "Anxious - easily upset": Number,
    "Open to new experiences - complex": Number,
    "Reserved - quiet": Number,
    "Sympathetic - warm": Number,
    "Disorganized - careless": Number,
    "Calm - emotionally stable": Number,
    "Conventional - uncreative": Number,
  },

  "cardiac-results": String,

  "eye-results": String,

  "mental-wellbeing-results": {
    Depression: String,
    Anxiety: String,
    Stress: String,
  },

  "sleep-results": String,
});

module.exports = mongoose.model("UserModel", UserSchema);
//
