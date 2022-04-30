"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var db_1 = require("../../db");
var schema_1 = require("../../schema");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var registerController = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, confirmPassword, value, UserExist, err_1, HasedPassword, data, token, err_2, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, username = _a.username, password = _a.password, confirmPassword = _a.confirmPassword;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                value = schema_1.registerSchema.validate({
                    email: email,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword
                }).value;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, db_1.pool.query("select username from users where username = $1", [value.username])];
            case 3:
                UserExist = _b.sent();
                if (UserExist.rows.length > 0) {
                    response
                        .send({ error: { username: "username is already used" } })
                        .status(400)
                        .end();
                    next();
                    return [2 /*return*/];
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [4 /*yield*/, bcrypt_1["default"].hash(value.password, 12)];
            case 6:
                HasedPassword = _b.sent();
                _b.label = 7;
            case 7:
                _b.trys.push([7, 9, , 10]);
                return [4 /*yield*/, db_1.pool.query("insert into users (username,password,email,action,subject,role) values ($1,$2,$3,$4,$5,$6) returning id,username,email,action,role,subject", [value.username, HasedPassword, value.email, "read", "Post", "user"])];
            case 8:
                data = _b.sent();
                token = jsonwebtoken_1["default"].sign(data.rows[0], process.env.SECRET);
                response
                    .status(200)
                    .cookie("user", token, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: false,
                    secure: false
                })
                    .send({
                    token: token,
                    data: data.rows[0],
                    ac: [{ subject: data.rows[0].subject, action: data.rows[0].action }]
                })
                    .end();
                next();
                return [3 /*break*/, 10];
            case 9:
                err_2 = _b.sent();
                console.log(err_2);
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                err_3 = _b.sent();
                console.log(err_3);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports["default"] = registerController;
