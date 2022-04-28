"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.notAuth = void 0;
var express_1 = __importDefault(require("express"));
var login_1 = __importDefault(require("./login"));
var notAuth = express_1["default"].Router();
exports.notAuth = notAuth;
notAuth.use("/api", login_1["default"]);
