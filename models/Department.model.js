import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {

        department_name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
