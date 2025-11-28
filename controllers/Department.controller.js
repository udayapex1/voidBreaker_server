import Department from "../models/Department.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createDepartment = async (req, res) => {
    try {

        // await Department.collection.dropIndex("department_id_1");
        const { department_name } = req.body;

        // Validate required fields
        if (!department_name) {
            return res.status(400).json({
                message: "Department name is required",
                status: 400,
                data: null,
            });
        }

        // Check if department already exists
        const existingDepartment = await Department.findOne({ department_name });

        if (existingDepartment) {
            return res.status(409).json({
                message: "Department already exists",
                status: 409,
                data: existingDepartment,
            });
        }

        // Create department
        const newDepartment = await Department.create({ department_name });

        return ApiResponse(res, 201, "Department created successfully", newDepartment);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while creating department",
            data: null,
        });
    }
}

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return ApiResponse(res, 200, "Departments retrieved successfully", departments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while retrieving departments",
            status: 500,
            data: null,
        });
    }
};
