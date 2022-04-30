import { NextFunction, Request, Response } from "express"

function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (
    !request.headers.authorization &&
    request.path !== "/v1/api/login" &&
    request.path !== "/v1/api/register"
  ) {
    console.log(request)
    response.status(401).send({ error: "not allowed" })
    next()
    return
  }
  next()
}

export default authentication
