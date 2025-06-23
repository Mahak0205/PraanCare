// const User = require('../models/User');

// exports.createUser = async(req, res) =>{
//     const{name, age, gender, race, religion, education, urban, familysize, married} = req.body;
//     const user = new User({name, age, gender, race, religion, education, urban, familysize, married});
//     await user.save();
//     res.json(user);
// }
// //



const User = require('../models/User');

// console.log('i am here to create user');

// exports.createUser = async (req, res) => {
//   try {
//     const {
//       name,
//       age,
//       gender,
//       race,
//       religion,
//       education,
//       urban,
//       familysize,
//       married,
//       personality
//     } = req.body;

//     const newUser = new User({
//       name,
//       age,
//       gender,
//       race,
//       religion,
//       education,
//       urban,
//       familysize,
//       married,
//       personality
//     });

//     await newUser.save();

//     console.log('created and saved user in db');
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Server error. Could not create user." });
//   }
// };

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

