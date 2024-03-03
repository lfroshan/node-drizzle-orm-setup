"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterSchema = exports.UserRegisterBody = void 0;
const zod_1 = require("zod");
exports.UserRegisterBody = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    fullname: zod_1.z.string(),
    password: zod_1.z.string(),
    confirmPassword: zod_1.z.string()
});
exports.UserRegisterSchema = zod_1.z.object({
    body: exports.UserRegisterBody
});
