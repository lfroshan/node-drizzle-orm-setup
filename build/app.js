"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./route/user/user.route"));
const requestErrorHandler_middleware_1 = require("./middleware/requestErrorHandler.middleware");
const app = (0, express_1.default)();
app.use("/health", async (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running'
    });
});
app.use('/api/v1/users', user_route_1.default);
app.use(express_1.default.json());
// Catch and return any error here!
app.use(requestErrorHandler_middleware_1.requestErrorHandler);
exports.default = app;
