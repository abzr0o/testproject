import joi from "joi"

const registerSchema = joi.object({
  username: joi.string().alphanum().min(4).max(30).required(),

  password: joi
    .string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
    .required(),

  confirmPassword: joi.ref("password"),

  email: joi.string().email({ minDomainSegments: 2 }).required(),
})

export default registerSchema
