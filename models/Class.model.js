import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {


        year: {
            type: Number,
            required: true,
        },

        section: {
            type: String,
            required: true,
        },

        department_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        class_teacher_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // class teacher is a user (teacher role)
            required: false,
            unique: false,
        },
    },
    { timestamps: true }
);

const ClassModel = mongoose.model("Class", classSchema);

export default ClassModel;
