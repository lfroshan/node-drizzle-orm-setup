"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UserLoginBody = void 0;
const zod_1 = require("zod");
exports.UserLoginBody = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.UserLoginSchema = zod_1.z.object({
    body: exports.UserLoginBody
});
