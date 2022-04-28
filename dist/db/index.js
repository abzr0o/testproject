"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.pool = void 0;
var pg_1 = __importDefault(require("./pg"));
exports.pool = pg_1["default"];
