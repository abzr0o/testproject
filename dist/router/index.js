"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.auth = exports.notAuth = void 0;
var notAuth_1 = __importDefault(require("./notAuth"));
exports.notAuth = notAuth_1["default"];
var auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1["default"];
