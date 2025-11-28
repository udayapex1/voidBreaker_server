import Subject from "../models/Subject.model.js";


export const createSubject = async (req, res) => {
    try {
        const { subject_name, subject_code } = req.body;

        if (!subject_name || !subject_code) {
            return res.status(400).json({
                message: "subject_name and subject_code are required",
                status: false,
            });
        }

        const existing = await Subject.findOne({ subject_code });
        if (existing) {
            return res.status(409).json({
                message: "Subject with this code already exists",
                status: false,
            });
        }

        const subject = await Subject.create({ subject_name, subject_code });

        return res.status(201).json({
            message: "Subject created successfully",
            status: true,
            data: subject,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: false,
            error: error.message,
        });
    }
};

// Get All Subjects
export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All subjects fetched",
            status: true,
            data: subjects,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: false,
            error: error.message,
        });
    }
};
