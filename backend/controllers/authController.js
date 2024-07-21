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
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { payload, token } = await authService.login(username, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.cookie("userDetails", JSON.stringify(payload), {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.json(payload);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookie only in production
      sameSite: "Strict",
      expires: new Date(0), // Expire the cookie immediately
    });

    res.cookie("userDetails", "", {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
