import joi from "joi"

const schema = joi
  .object({
    username: joi.string().min(2).max(30).required(),

    password: joi.string(),
  })
  .with("username", "password")

export default schema
