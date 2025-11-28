import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;
        const token = req.cookies?.jwt || bearer;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId).select("+token");

        if (!user || user.token !== token) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = user.toJSON();
        req.authUserId = user._id;
        req.authToken = token;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

