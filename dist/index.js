"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./db");
var router_1 = require("./router");
var controller_1 = require("./controller");
var PORT = process.env.PORT || 2000;
db_1.pool.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("connected to db");
});
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({ origin: "*" }));
app.disable("x-powered-by");
app.use(express_1["default"].json());
app.use((0, cookie_parser_1["default"])());
app.use("/v1", router_1.notAuth);
app.use(controller_1.authentication);
app.use("/v2", router_1.auth);
app.listen(PORT, function () {
    console.log("up and running at port ".concat(PORT));
});
