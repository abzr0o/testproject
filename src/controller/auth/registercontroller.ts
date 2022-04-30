import { NextFunction, Request, Response } from "express"
import { pool } from "../../db"
import { registerSchema } from "../../schema"
import bcry from "bcrypt"
import jwt from "jsonwebtoken"
const registerController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, username, password, confirmPassword } = request.body

  try {
    const { value } = registerSchema.validate({
      email,
      username,
      password,
      confirmPassword,
    })
    try {
      const UserExist = await pool.query(
        "select username from users where username = $1",
        [value.username]
      )
      if (UserExist.rows.length > 0) {
        response
          .send({ error: { username: "username is already used" } })
          .status(400)
          .end()
        next()
        return
      }
    } catch (err) {
      console.log(err)
    }

    const HasedPassword = await bcry.hash(value.password, 12)
    try {
      const data = await pool.query(
        "insert into users (username,password,email,action,subject,role) values ($1,$2,$3,$4,$5,$6) returning id,username,email,action,role,subject",
        [value.username, HasedPassword, value.email, "read", "Post", "user"]
      )
      const token = jwt.sign(data.rows[0], process.env.SECRET)
      response
        .status(200)
        .cookie("user", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: false,
          secure: false,
        })
        .send({
          token,
          data: data.rows[0],
          ac: [{ subject: data.rows[0].subject, action: data.rows[0].action }],
        })
        .end()
      next()
    } catch (err) {
      console.log(err)
    }
  } catch (err) {
    console.log(err)
  }
}

export default registerController
