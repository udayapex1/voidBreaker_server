import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: ["assignment", "notes"],
            required: true,
        },

        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClassModel",
            required: true,
        },

        uploader_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assuming teacher is also a user
            required: true,
        },
    },
    { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
export default StudyMaterial;