import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyEmailToken = asyncHandler(async (req, _, next) => {
  try {
    const token = req.query.token || req.body.token;
    if (!token) throw new ApiError(400, "Missing or invalid token");

    const decoded = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired token");
  }
});

export const verifyForgotPasswordToken = asyncHandler(async (req, _, next) => {
  try {
    const token = req.query.token || req.body.token;
    if (!token) throw new ApiError(400, "Missing or invalid token");

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired token");
  }
});
