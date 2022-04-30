import { Request, Response, NextFunction } from "express"
import { pool } from "../../db"

const postGet = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = await pool.query(
      "select users.id,posts.id, users.username,posts.body,posts.comments,posts.likes from posts inner join users on users.id=posts.userid"
    )
    response.send({ data: data.rows })
  } catch (err) {
    response.status(500).end()
    next()
  }
}

export default postGet
