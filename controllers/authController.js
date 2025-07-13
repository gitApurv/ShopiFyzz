const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists != null) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name: name,
      email: email,
      password: hashedPassword,
      cart: {
        totalPrice: 0,
        items: [],
      },
    };

    const user = await User.create(userData);

    if (!user) {
      res.status(400);
      throw new Error("User Creation Failed");
    }

    const id = user._id;
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      ok: true,
      message: "User created Successful",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401);
      throw new Error("User does not exists");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      res.status(400);
      throw new Error("Invalid Password");
    }

    const id = user._id;
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      ok: true,
      message: "Login Successful",
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expiresIn: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    ok: true,
    message: "User logged out successfully",
  });
};
