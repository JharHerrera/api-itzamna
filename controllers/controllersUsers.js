import { validateUser, validatePartialUser } from "../schema/validation.js";
import { ModelUser } from "../models/models.js";

export class UserController {
  static async getAll(req, res) {
    const { result } = req.query;
    const user = await ModelUser.getAll({ result });
    res.json(user);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const user = await ModelUser.getByid({ id });

    if (user) return res.json(user);
    res.status(404).json({ message: "User not found" });
  }

  static async create(req, res) {
    const result = req.body;
    const { name, cellphone, email, password } = result;

    if (!name || !cellphone || !email || !password) {
      return res
        .status(400)
        .send({ status: "Error", message: "Los campos no estan cubiertos" });
    }

    const user = await ModelUser.create({ input: result });

    if (!user) {
      return res
        .status(400)
        .send({ status: "Error", message: "Error al crear el usuario" });
    }

    res.json({ status: "ok", message: "User create" });
  }

  static async update(req, res) {
    const result = req.body;
    const id = req.params;
    console.log(result);
    console.log(id);
    if (!id || !result) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const updateUser = await ModelUser.update({ id, input: result });
    return res.json(updateUser);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const user = await ModelUser.delete({ id });

    if (user.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(204).json({ message: "User delete" });
    }
  }
}
