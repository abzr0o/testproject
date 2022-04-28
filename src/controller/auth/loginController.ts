import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { pool } from "../../db"
import { LoginSchema } from "../../schema"

const LoginController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password, username } = request.body

  try {
    await LoginSchema.validateAsync({ password, username })
  } catch (err) {
    response.status(400).send({ error: { notvalid: "not valid inputs" } })
  }

  try {
    const data = await pool.query("select * from users where username = $1 ", [
      username,
    ])
    if (data.rows.length > 0) {
      try {
        const CheckPassword = await bcrypt.compare(
          password,
          data.rows[0].password
        )

        if (CheckPassword) {
          const payload = {
            id: data.rows[0].id,
            username: data.rows[0].username,
            email: data.rows[0].email,
          }
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1d",
          })
          response
            .cookie(
              "session",
              { token },
              {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: false,
                secure: false,
              }
            )
            .status(200)
            .send({ token })
            .end()
          next()
        } else {
          response
            .status(400)
            .send({ error: { password: "wrong crediantil" } })
            .end()
          next()
        }
      } catch (err) {
        response.status(500).end()
        next()
      }
    } else {
      response
        .status(400)
        .send({ error: { username: "username not found" } })
        .end()
      next()
    }
  } catch (err) {
    response.status(500).end()
    next()
  }
}

export default LoginController
