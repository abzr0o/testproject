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
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = require("../../db");
var schema_1 = require("../../schema");
var LoginController = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, username, err_1, data, CheckPassword, payload, token, RefreshTokens, err_2, err_3, err_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = request.body, password = _a.password, username = _a.username;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema_1.LoginSchema.validateAsync({ password: password, username: username })];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                // const eroor = {}
                // eroor[err.details[0].path[0]] = err.details.message
                // console.log(typeof err.details[0].path[0])
                response
                    .status(400)
                    .send({ error: (_b = {}, _b[err_1.details[0].path[0]] = err_1.details[0].message, _b) });
                return [3 /*break*/, 4];
            case 4:
                _c.trys.push([4, 18, , 19]);
                return [4 /*yield*/, db_1.pool.query("select * from users where username = $1 ", [
                        username,
                    ])];
            case 5:
                data = _c.sent();
                if (!(data.rows.length > 0)) return [3 /*break*/, 16];
                _c.label = 6;
            case 6:
                _c.trys.push([6, 14, , 15]);
                return [4 /*yield*/, bcrypt_1["default"].compare(password, data.rows[0].password)];
            case 7:
                CheckPassword = _c.sent();
                if (!CheckPassword) return [3 /*break*/, 12];
                payload = {
                    id: data.rows[0].id,
                    username: data.rows[0].username,
                    email: data.rows[0].email,
                    role: data.rows[0].role,
                    ability: [
                        { action: data.rows[0].action, subject: data.rows[0].subject },
                    ]
                };
                token = jsonwebtoken_1["default"].sign(payload, process.env.SECRET, {
                    expiresIn: "1h"
                });
                RefreshTokens = jsonwebtoken_1["default"].sign(payload, process.env.SECRETR, {
                    expiresIn: "1d"
                });
                _c.label = 8;
            case 8:
                _c.trys.push([8, 10, , 11]);
                return [4 /*yield*/, db_1.pool.query("insert into RefreshTokens(token)values($1) returning *", [RefreshTokens])];
            case 9:
                _c.sent();
                response
                    .cookie("session", { token: token }, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: false,
                    secure: false
                })
                    .status(200)
                    .send({
                    userData: payload,
                    accessToken: token,
                    refreshToken: RefreshTokens
                })
                    .end();
                next();
                return [2 /*return*/];
            case 10:
                err_2 = _c.sent();
                response.status(500).end();
                next();
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 13];
            case 12:
                response
                    .status(400)
                    .send({ error: { password: "wrong crediantil" } })
                    .end();
                next();
                _c.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                err_3 = _c.sent();
                response.status(500).end();
                next();
                return [3 /*break*/, 15];
            case 15: return [3 /*break*/, 17];
            case 16:
                response
                    .status(400)
                    .send({ error: { username: "username not found" } })
                    .end();
                next();
                _c.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                err_4 = _c.sent();
                response.status(500).end();
                next();
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); };
exports["default"] = LoginController;
