import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnColudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details
  //validation
  //check user already exists
  //check for images,check for avatar
  //upload to cloudinary,avatar
  //create user object - create entry in db
  //remove 'password and refresh token field from response
  //check for user creation
  //return res

  const { username, email, password, fullname } = req.body;

  if (
    [username, email, password, fullname].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "all fields required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist with this username email");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await uploadOnColudinary(avatarLocalPath);
  const coverImage = await uploadOnColudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while regrestring a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(
      200,
      createdUser,
      "user registered succesfully"
    ));

});



export { registerUser };
