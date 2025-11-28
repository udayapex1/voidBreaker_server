const allowTeacherOrAdmin = (req, res, next) => {
    try {
        const user = req.user; // user should already be attached by auth middleware

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User not found",
                status: 401,
                data: null,
            });
        }

        if (user.role === "teacher" || user.role === "admin") {
            return next();
        }

        return res.status(403).json({
            message: "Access denied. Teachers or admins only.",
            status: 403,
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error in role validation",
            status: 500,
            data: null,
        });
    }
};

const allowAdmin = (req, res, next) => {
    try {
        const user = req.user; // user should already be attached by auth middleware

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User not found",
                status: 401,
                data: null,
            });
        }

        if (user.role === "admin") {
            return next(); // allow only admin
        }

        return res.status(403).json({
            message: "Access denied. Admins only.",
            status: 403,
            data: null,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error in admin validation",
            status: 500,
            data: null,
        });
    }
};




export { allowTeacherOrAdmin, allowAdmin };
