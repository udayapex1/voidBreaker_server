import ClassModel from "../models/Class.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const createClass = async (req, res) => {
    try {
        // await ClassModel.collection.dropIndex("class_id_1");

        const { year, section, department_id, class_teacher_id } = req.body;

        // Validate required fields
        if (!year || !section || !department_id) {
            return res.status(400).json({
                message: "Year, section, and department_id are required",
                status: 400,
                data: null,
            });
        }

        // Check if class already exists for same year + section + department
        const existingClass = await ClassModel.findOne({
            year,
            section,
            department_id,
        });

        if (existingClass) {
            return res.status(409).json({
                message: "Class already exists for this year, section, and department",
                status: 409,
                data: existingClass,
            });
        }

        // Create class
        const newClass = await ClassModel.create({
            year,
            section,
            department_id,
            class_teacher_id: class_teacher_id || null, // optional
        });

        return ApiResponse(res, 201, "Class created successfully", newClass);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while creating class",
            data: null,
        });
    }
};

export const getAllClasses = async (req, res) => {
    try {
        const classes = await ClassModel.find().populate('department_id').populate('class_teacher_id');
        return ApiResponse(res, 200, "Classes retrieved successfully", classes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while retrieving classes",
            status: 500,
            data: null,
        });
    }
}
