import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {

        subject_name: {
            type: String,
            required: true,
            trim: true,
        },

        subject_code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;