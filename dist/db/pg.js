"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = __importDefault(require("pg"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var env = process.env;
var poolConfig = {
    user: env.DB_USER,
    host: env.DB_ENGPOINT,
    port: env.DB_PORT,
    password: env.DB_PASSWORD,
    database: env.DB
};
var pool = new pg_1["default"].Pool(poolConfig);
exports["default"] = pool;
