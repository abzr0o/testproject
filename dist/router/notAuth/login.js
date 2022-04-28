"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controller_1 = require("../../controller");
var router = (0, express_1.Router)();
router.post("/login", controller_1.LoginController);
exports["default"] = router;
