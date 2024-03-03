"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestErrorHandler = void 0;
const zod_1 = require("zod");
const requestErrorHandler = (error, req, res, next) => {
    if (!error)
        return next();
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: 'false',
            error: error.name,
            message: 'Request Validation Error',
            details: error.flatten()
        });
    }
    return res.status(500).json({
        success: 'false',
        error: error.name,
        message: 'Server Error',
        details: error.flatten()
    });
};
exports.requestErrorHandler = requestErrorHandler;
