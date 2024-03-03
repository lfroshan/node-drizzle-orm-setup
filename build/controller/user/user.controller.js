"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const connection_1 = __importDefault(require("../../db/sqlite/connection"));
const User_schema_1 = require("../../db/sqlite/schema/User.schema");
async function registerUser(req, res) {
    const userPayload = req.body;
    const user = await connection_1.default.insert(User_schema_1.users).values([{ ...userPayload }]);
    res.status(201).json({
        success: true,
        message: 'Created',
        user: user
    });
}
exports.registerUser = registerUser;
async function loginUser(req, res) {
}
exports.loginUser = loginUser;
