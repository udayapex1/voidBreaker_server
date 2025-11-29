import Resource from "../models/Resource.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createResource = async (req, res) => {
    try {
        const { resource_name, type, location, availability_status } = req.body;

        // Validate required fields
        if (!resource_name || !type) {
            return ApiResponse(res, 400, "resource_name and type are required");
        }

        // Create new resource
        const newResource = await Resource.create({
            resource_name,
            type,
            location,
            availability_status,
        });

        return ApiResponse(
            res,
            201,
            "Resource created successfully",
            newResource
        );
    } catch (error) {
        return ApiResponse(
            res,
            500,
            "Internal server error",
            { error: error.message }
        );
    }
};
export const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        return ApiResponse(res, 200, "Resources fetched successfully", resources);
    } catch (error) {
        return ApiResponse(
            res,
            500,
            "Internal server error",
            { error: error.message }
        );
    }
}

