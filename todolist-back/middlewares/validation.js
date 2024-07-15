const User = require('../models/User');
const mongoose = require('mongoose')

const userExists = async function (req, res, next) {
  try {
    const { userId } = req.params; // Assuming the user ID is in request params

    // Validate the userId using Mongoose ObjectId (if validation is desired)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) }); // Use mongoose.Types.ObjectId for proper ID format

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request object for further use in the route handler
    req.user = user;

    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle internal errors
  }
};

module.exports = {
  userExists
};