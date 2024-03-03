"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    const schemaValidation = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });
    if (!schemaValidation.success)
        return res.status(400).json(schemaValidation.error);
    return next();
};
exports.validateSchema = validateSchema;
