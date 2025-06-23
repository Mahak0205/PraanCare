const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const mentalPredictRoutes = require('./routes/mentalPredictRoutes');
const sleepPredictRoutes = require('./routes/sleepPredictRoutes');
// Allow requests from your frontend port


require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're sending cookies/auth later
}));
app.use(express.json());
connectDB();
console.log('Connected to db and moving to routes now.....');

app.use('/api/auth', authRoutes);

app.use('/api/users', userProfileRoutes);

app.use('/api/mental',mentalPredictRoutes);

app.use('/api/sleep', sleepPredictRoutes);

// Start server
app.listen(5000, () => {
  console.log("🚀 Server started on port 5000");

  // ✅ Safely access _router only if it exists
  if (app._router && app._router.stack) {
    console.log("📌 Registered routes:");
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
        console.log(`➡️  ${methods} ${middleware.route.path}`);
      }
    });
  } else {
    console.warn("⚠️ No routes registered yet.");
  }
});
