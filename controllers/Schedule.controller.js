import ClassSchedule from "../models/ClassSchedule.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createSchedule = async (req, res) => {
    try {
        const { day, start_time, end_time, class_id, subject_id, teacher_id } =
            req.body;

        if (!day && day !== 0 || !start_time || !end_time || !class_id || !subject_id || !teacher_id) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }

        // Prevent teacher clash (same time)
        const conflict = await ClassSchedule.findOne({
            teacher_id,
            day,
            start_time,
            end_time,
        });

        if (conflict) {
            return res.status(409).json({
                status: false,
                message: "Teacher already has a class at this time",
            });
        }

        const schedule = await ClassSchedule.create({
            day,
            start_time,
            end_time,
            class_id,
            subject_id,
            teacher_id,
        });

        return ApiResponse(res, 201, "Schedule created successfully", schedule);
    } catch (error) {
        return ApiResponse(res, 500, "Internal server error", { error: error.message });
    }
};

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await ClassSchedule.find();


        return ApiResponse(res, 200, "All schedules fetched successfully", schedules);
    } catch (error) {
        return ApiResponse(res, 500, "Internal server error", { error: error.message });
    }
};