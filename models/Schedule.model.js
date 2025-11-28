import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema(
    {


        day: {
            type: Number,
            required: true,
            min: 0,
            max: 6,
        },

        start_time: {
            type: String,
            required: true,
        },

        end_time: {
            type: String,
            required: true,
        },

        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },

        subject_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        teacher_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);
export default ClassSchedule;
