import { ModelLogin } from "../models/modelsLogin.js";
import { compare } from "../utils/securityPass.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class loginController {
  static async create(req, res) {
    const result = req.body;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: "Error", message: "Los campos no estan cubiertos" });
    }

    const user = await ModelLogin.create({ input: result });

    if (!user) {
      return res
        .status(400)
        .send({ status: "Error", message: "Error al inciar sesión" });
    }

    const pass = await compare(password, user.passwordHash);

    if (!pass) {
      return res
        .status(400)
        .send({ status: "Error", message: "Error al inciar sesión" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

    const cookinOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      path: "/",
    };

    res.cookie("jwt", token, cookinOption);
    res.json({ status: "ok", message: "Usuario loggeado", redirect: "/user.html" });

    // const result = req.body;
    // if (result === 0) {
    //   return res.status(400).json({ error: JSON.parse(result.error.message) });
    // }

    // const checkPassword = await compare(result.password, user.passwordHash);
    // if (!checkPassword){
    //   return res.status(400).json({ error: JSON.parse(result.error.message) });
    // }
    // const tokenSession = tokenSing(user)
    // const {expires, path} = tokenSession
    // console.log(tokenSession)
    // res.send({status: 'ok', message: 'Usuario logeado', redirect: "/user"})

    // const checkPassword = await compare(password, user.passwordHash);
    // console.log(checkPassword);
  }
}
