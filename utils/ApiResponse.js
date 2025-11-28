export const ApiResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        message,
        status,
        data,
    });
};
