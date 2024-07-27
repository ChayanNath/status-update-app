const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const user = await authService.register(
      firstName,
      lastName,
      username,
      password
    );
    res
      .status(200)
      .json({ message: "Registered successfully! Please login to continue." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { payload, token, refreshToken } = await authService.login(
      username,
      password
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(payload);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0),
    });

    user.refreshToken = null;
    user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const { newToken, newRefreshToken } = await authService.refreshToken(
      refreshToken
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };
    res
      .status(200)
      .cookie("token", newToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json({ success: true });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
