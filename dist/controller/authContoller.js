"use strict";
exports.__esModule = true;
function authentication(request, response, next) {
    if (!request.headers.authorization &&
        request.path !== "/v1/api/login" &&
        request.path !== "/v1/api/register") {
        console.log(request);
        response.status(401).send({ error: "not allowed" });
        next();
        return;
    }
    next();
}
exports["default"] = authentication;
