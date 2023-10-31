import { ModelLogin } from "../models/modelsLogin.js";
import { compare } from "../utils/securityPass.js";
import jwt from "jsonwebtoken";

export class loginController {
  static async create(req, res) {
    const { email, password } = req.body;

    const data = await ModelLogin.create({ input: email });

    const passwordCorrect =
      data === undefined || null
        ? false
        : await compare(password, data.passwordHash);

    if (!(data && passwordCorrect)) {
      res.status(401).json({ error: "usuario o contraseña invalida" });
    } else {
      const userForToken = {
        id: data.id,
        name: data.name,
        email: data.name,
        cellphone: data.cellphone,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY);

      res.cookie('jwt', token, {httpOnly: true})
      res.send({
        id: data.id,
        name: data.name,
        email: data.name,
        cellphone: data.cellphone,
        status: "ok",
        token
      });
    }
  }
}