import { jwt } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
  
    if (!token) {
      throw new ApiError(401, "unauthorised request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
  
    if (!user) {
      throw new ApiError(401, "invalid access token");
    }
    //added user access to request body so can be accessed for (logginout) protected routes
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401,"invalid access token");
  }
});
