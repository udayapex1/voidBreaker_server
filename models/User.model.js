import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        college_id: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        token: {
            type: String,
            default: null,
            select: false,
        },

        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            required: true,
            default: "student",
        },

        year: {
            type: Number,
            default: null,
        },

        section: {
            type: String,
            default: null,
        },

        profile_photo: {
            type: String, // URL to profile image
            default: null,
        },

        skills: {
            type: [String], // Array of strings
            default: [],
        },


        department_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },
        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClassModel",
            default: null,
        },


    },


    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (_, ret) => {
        delete ret.password;
        delete ret.token;
        return ret;
    },
});

const User = mongoose.model("User", userSchema);

export default User;
