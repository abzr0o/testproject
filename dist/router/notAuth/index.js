"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var login_1 = __importDefault(require("./login"));
var register_1 = __importDefault(require("./register"));
var notAuth = express_1["default"].Router();
notAuth.use("/api", login_1["default"]);
notAuth.use("/api", register_1["default"]);
exports["default"] = notAuth;
