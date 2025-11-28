
import User from "../models/User.model.js";


export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: "teacher" }).select("-password").lean();
        return res.json({ teachers });
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return res.status(500).json({ message: "Unable to fetch teachers" });
    }
}