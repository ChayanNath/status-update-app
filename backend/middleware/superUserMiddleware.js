const User = require("../models/User");

const superUserMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user || !user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Access denied. Super users only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = superUserMiddleware;
