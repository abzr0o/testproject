import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { pool } from "../../db"

const PostPost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tokens = request.headers.authorization
  const token = tokens.split(" ")
  const body = request.body.body
  const DecodedToken = jwt.decode(token[1])
  try {
    pool.query("insert into posts(body,userid) values ($1,$2)", [
      body,
      (DecodedToken as any).id,
    ])
    response.status(204).end()
  } catch (err) {
    response.status(500).end()
  }
}

export default PostPost
