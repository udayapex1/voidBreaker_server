import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import cloudinary from "../utils/cloudinary.js";
import createToken from "../jwt/AuthToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User Profile is required" });
        }

        const { profile_photo } = req.files;

        const allowedFormate = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedFormate.includes(profile_photo.mimetype)) {
            return res.status(400).json({ message: "Invalid Photo Format" });
        }

        const {
            name,
            email,
            password,
            role,
            year,
            section,
            skills,
            department_id,
            class_id,
            college_id

        } = req.body;


        if (!name || !email || !password || !role || !college_id) {
            return res.status(400).json({ message: "Please fill required fields" });
        }


        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(profile_photo.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({ message: "Profile upload failed" });
        }

        // 📌 Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            year,
            section,
            profile_photo: cloudinaryResponse.url,
            skills,
            department_id,
            class_id,
            college_id

        });

        await newUser.save();

        res.status(200).json({
            message: "User registered successfully.",
            user: newUser.toJSON(),
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().select("-password").lean();
        return res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Unable to fetch users" });
    }
};


export const myProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    return ApiResponse(res, 200, "Profile fetched successfully", { user });
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        await createToken(user._id, res);
        const payload = user.toJSON();

        return ApiResponse(res, 200, "Login successful", { user: payload });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        if (req.authUserId) {
            await User.findByIdAndUpdate(req.authUserId, { token: null });
        }

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/",
        });

        return ApiResponse(res, 200, "Logout successful");
    } catch (error) {
        console.error("Logout error:", error);
        return ApiResponse(res, 500, "Unable to logout");
    }
};


export const testAPI = async (req, res) => {
    return ApiResponse(res, 200, "API is working");
};