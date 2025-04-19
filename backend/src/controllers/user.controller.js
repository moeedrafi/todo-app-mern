import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { transporter } from "../utils/nodemailer.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong during access and refresh tokens!"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "User Already exists");
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering!");
  }

  const verificationToken = user.generateEmailVerificationToken();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Welcome! Verify now its a order",
    html: `
          <p>Welcome! Please verify your email by clicking the link below:</p>
            <a href="http://localhost:5173/email-verify?token=${verificationToken}">
            Verify your email
            </a>
          `,
  };
  await transporter.sendMail(mailOptions);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "User Registered. Please Verify your mail"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email missing");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "User not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = user.toObject();
  delete loggedInUser.password;
  delete loggedInUser.refreshToken;

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("requestToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized access");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "refresh token is expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User fetched"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "Already Verified");
  }

  user.isVerified = true;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email Verified Successfully!"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(404, "User with that email does not exists");
  }

  const resetToken = existingUser.generateResetPasswordToken();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Reset your Password",
    html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="http://localhost:5173/reset-password?token=${resetToken}">
            Reset your password
          </a>
          <p>This link will expire in 15 minutes.</p>
          `,
  };
  await transporter.sendMail(mailOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Reset password email sent Successfully!"));
});

const resetPassword = asyncHandler(async (req, res) => {});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  user.password = newPassword;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new ApiError(400, "Missing fields");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { fullName, email } },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Updated Successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  await deleteOnCloudinary(req.user?.avatar);

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "error uploading Avatar File");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Image updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  verifyEmail,
};
