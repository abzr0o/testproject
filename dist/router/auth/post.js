"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controller_1 = require("../../controller");
var router = (0, express_1.Router)();
router.get("/post", controller_1.postGet);
router.post("/post", controller_1.PostPost);
exports["default"] = router;
