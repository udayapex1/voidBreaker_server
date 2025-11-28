import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        media_url: {
            type: String,
            default: null,
        },

        start_date: {
            type: Date,
            required: true,
        },

        end_date: {
            type: Date,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",       // user who created the event
            required: true,
        },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;