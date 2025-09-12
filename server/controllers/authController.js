const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../helpers/sendEmail");

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
      cart: [],
    };

    const user = await User.create(userData);

    if (!user) {
      res.status(400);
      throw new Error("User Creation Failed");
    }

    const emailBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to ShopiFyzz</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
          <!-- Header -->
          <div style="background-color: #4f46e5; padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to ShopiFyzz 👋</h1>
            <p style="margin: 10px 0 0; font-size: 16px;">Your journey starts here</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px 20px; color: #333;">
            <p style="font-size: 16px; line-height: 1.6;">
              Hi there,<br />
              <br />
              Thank you for signing up with <strong>ShopiFyzz</strong>! We’re excited to have you join our growing community.
            </p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://shopifyzz.com" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Explore Now
              </a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            &copy; 2025 ShopiFyzz. All rights reserved.<br />
          </div>
        </div>
      </body>
    </html>
    `;

    sendEmail(email, "Welcome to ShopiFyzz!", emailBody);

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

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400);
      throw new Error("User does not exists!");
    }

    const buffer = crypto.randomBytes(16);
    const resetToken = buffer.toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    const emailBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset - ShopiFyzz</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
          
          <!-- Header -->
          <div style="background-color: #4f46e5; padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 26px;">Reset Your Password 🔑</h1>
            <p style="margin: 10px 0 0; font-size: 16px;">ShopiFyzz Account Security</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px 20px; color: #333;">
            <p style="font-size: 16px; line-height: 1.6;">
              Hi there,<br />
              We received a request to reset your <strong>ShopiFyzz</strong> account password.
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
              Click the button below to set a new password:
            </p>

            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CORS_ORIGIN}/reset/${resetToken}" style="background-color: #4f46e5; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #666;">
              If you didn't request a password reset, you can safely ignore this email.  
              This link will expire in <strong>30 minutes</strong> for your security.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            &copy; 2025 ShopiFyzz. All rights reserved.<br />
          </div>
        </div>
      </body>
    </html>
      `;
    sendEmail(email, "Reset Password", emailBody);

    res.status(200).json({
      ok: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error("Link Expired");

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      ok: true,
      message: "Password reset successfully",
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
