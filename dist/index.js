"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var db_1 = require("./db");
var router_1 = require("./router");
var PORT = process.env.PORT || 2000;
db_1.pool.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("connected to db");
});
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use("/v1", router_1.notAuth);
app.listen(PORT, function () {
    console.log("up and running at port ".concat(PORT));
});
