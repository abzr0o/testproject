"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.postGet = exports.authentication = exports.registerController = exports.LoginController = exports.PostPost = void 0;
var loginController_1 = __importDefault(require("./auth/loginController"));
exports.LoginController = loginController_1["default"];
var postGET_1 = __importDefault(require("./auth/postGET"));
exports.postGet = postGET_1["default"];
var PostPost_1 = __importDefault(require("./auth/PostPost"));
exports.PostPost = PostPost_1["default"];
var registercontroller_1 = __importDefault(require("./auth/registercontroller"));
exports.registerController = registercontroller_1["default"];
var authContoller_1 = __importDefault(require("./authContoller"));
exports.authentication = authContoller_1["default"];
