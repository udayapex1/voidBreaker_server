import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import classRoutes from "./routes/Class.routes.js";
import departmentRoutes from "./routes/Department.routes.js"
import subjectRoutes from "./routes/Subject.routes.js"
import scheduleRoutes from "./routes/Schedule.routes.js"
import eventRoutes from "./routes/Event.routes.js"
import resourceRoutes from "./routes/Resource.routes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:3000",
    "*",
];



app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,

        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


try {
    connectDB()
} catch (error) {

}



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/resources", resourceRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


