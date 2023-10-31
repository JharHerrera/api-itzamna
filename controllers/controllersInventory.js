import { ItemModels } from "../models/modelsItem.js";
import { validateToken } from "../utils/generateToken.js";

export class InventoryController {
  static async getAll(req, res) {
    const { result } = req.query;
    const item = await ItemModels.getAll({ result });
    res.json(item);
  }

  static async getByData(req, res) {
    const name_item = req.query;
    const item = await ItemModels.getByData({ input: name_item });
    if (item) return res.json(item);
    res.status(404).json({ message: "Item not found" });
  }

  static async getByFilter(req, res) {
    const category = req.query;
    const itemFilter = await ItemModels.getByFilter({ input: category });
    if (itemFilter) return res.json(itemFilter);
    res.status(404).json({ message: "Item not found" });
  }

  static async create(req, res) {
    //   console.log(req.file, req.body);
    const resultBody = req.body;
    const resultFile = req.file;
    const authorizatiion = req.get("authorization");

    const pass = validateToken(authorizatiion);

    if (pass === false) {
      res.status(401).json({ error: "sesion invalida" });
    } else {
      const item = await ItemModels.create({ resultBody, resultFile });
      res.json({ item, message: "chido" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = req.body;
    const resultFile = req.file;
    const authorizatiion = req.get("authorization");

    const pass = validateToken(authorizatiion);

    if (pass === false) {
      res.status(401).json({ error: "sesion invalida" });
    } else {
      if (!id) {
        return res
          .status(404)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { name_item, model, brand, amount, observation, category } = result;
      const data = { name_item, model, brand, amount, observation, category };

      const updateItem = await ItemModels.update({
        id,
        input: data,
        resultFile,
      });
      res.json({ updateItem, message: "chido" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    const authorizatiion = req.get("authorization");

    const pass = validateToken(authorizatiion);

    if(!pass){
      res.status(401).json({ error: "sesion invalida" });
    }else{
      const result = await ItemModels.delete({id})
      res.json({result, message: 'chido'})
    }
  }
}
