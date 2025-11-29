import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {

        resource_name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: false,
            trim: true,
        },



        availability_status: {
            type: String,
            enum: ["available", "unavailable", "maintenance"],
            required: true,
            default: "available",
        },
    },
    { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
