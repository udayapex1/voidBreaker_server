import Event from "../models/Event.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";



export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            media_url,
            start_date,
            end_date,
            location,
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !description ||
            !start_date ||
            !end_date ||
            !location
        ) {
            return res.status(400).json({
                status: false,
                message: "All fields are required.",
            });
        }

        // Optional: ensure end_date is not before start_date
        if (new Date(end_date) < new Date(start_date)) {
            return res.status(400).json({
                status: false,
                message: "End date cannot be earlier than start date.",
            });
        }

        // created_by from auth middleware
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized. User ID missing.",
            });
        }

        // Create new event
        const newEvent = await Event.create({
            title,
            description,
            media_url,
            start_date,
            end_date,
            location,
            created_by: userId,
        });

        return ApiResponse(res, 201, "Event created successfully", newEvent);

    } catch (error) {
        console.error("Error creating event:", error);
        return ApiResponse(res, 500, "Internal server error", { error: error.message });
    }
};
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        return ApiResponse(res, 200, "All events fetched successfully", events);
    } catch (error) {
        return ApiResponse(
            res,
            500,
            "Internal server error",
            { error: error.message }
        );
    }
};