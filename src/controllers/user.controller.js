import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req, res) => {
    const {userName, fullName, email, password} = req.body
    console.log(req.body);
    
    if (!(userName && fullName && email && password)) {
        throw new ApiError(400, 'Please provide all details')
    }

    const existedUser = await User.findOne({
        $or: [{email}, {userName}]
    })

    if (existedUser) {
        throw new ApiError(400, 'user already exists')
    };

    let avatar = null //in case no avatar is provided
    if (req.file) { 
        const uploadResult = await uploadOnCloudinary(req.file?.path)
        console.log(req.file);
        console.log(req.file.path);

        if (!uploadResult) {
            throw new ApiError(500, 'Error uploading to Cloudinary')
        }

        avatar = uploadResult.url
    }

    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        password,
        avatar
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, 'Something went wrong while registering the user')
    }

    return res.status(201).json(new ApiResponse(201, 'User created Successfully', createdUser))
    
})


const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if (!(email && password)) {
        throw new ApiError(400, "email and password is required")
    }

    const user = await User.findOne({
        $or: [{email}]
    })

    if (!user) {
        throw new ApiError(404, 'User does not exist')
    }
})
export {registerUser}