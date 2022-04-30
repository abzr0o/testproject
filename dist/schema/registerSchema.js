"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var registerSchema = joi_1["default"].object({
    username: joi_1["default"].string().alphanum().min(4).max(30).required(),
    password: joi_1["default"]
        .string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
        .required(),
    confirmPassword: joi_1["default"].ref("password"),
    email: joi_1["default"].string().email({ minDomainSegments: 2 }).required()
});
exports["default"] = registerSchema;
