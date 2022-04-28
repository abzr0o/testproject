"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var schema = joi_1["default"]
    .object({
    username: joi_1["default"].string().min(2).max(30).required(),
    password: joi_1["default"].string()
})["with"]("username", "password");
exports["default"] = schema;
