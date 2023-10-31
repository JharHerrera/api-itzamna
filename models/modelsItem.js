import { connection } from "../utils/connectionBD.js";
import { fileURLToPath } from "url";
import fs from "node:fs";
import { dirname } from "node:path";
import { clean } from "../utils/cleanObject.js";
import { join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const imgT = {};

export class ItemModels {
  static async getAll({ result }) {
    const [info] = await connection.query(`
      SELECT * FROM item
    `);
    return info;
  }

  static async getByData({ input }) {
    const info = Object.values(input);

    const [data] = await connection.query(
      `SELECT * FROM item WHERE name_item = ?;`,
      [info]
    );

    if (data.length === 0) return null;
    return data;
  }

  static async getByFilter({ input }) {
    const info = Object.values(input);

    const [data] = await connection.query(
      `SELECT * FROM item WHERE category = ?;`,
      [info]
    );

    if (data.length === 0) return null;
    return data;
  }

  static async create({ resultBody, resultFile }) {
    const { nameItem, model, brand, amount, observation, category, userId } =
      resultBody;
    const { filename, path } = resultFile;

    let buff = fs.readFileSync(path);
    let base64data = buff.toString("base64");
    try {
      const result = await connection.query(
        `INSERT INTO item (name_item, model, brand, amount, observation, category, name_fiel, imagen, user_id)
          VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?))`,
        [
          nameItem,
          model,
          brand,
          amount,
          observation,
          category,
          filename,
          base64data,
          userId,
        ]
      );

      return result;
    } catch (e) {
      console.error("Ocurrió un error al guardar el Item: ", e.message);
    }
  }

  static async update({ id, input, resultFile }) {
    clean(input);

    try {
      await connection.query(
        `UPDATE item SET ?
          WHERE id = ?;`,
        [input, id]
      );
    } catch (error) {
      console.error("Ocurrio un error al actualizar el Item: ", error.message);
    }

    if (resultFile) {
      const { filename, path } = resultFile;

      let buff = fs.readFileSync(path);
      let base64data = buff.toString("base64");

      try {
        await connection.query(
          `UPDATE item SET name_fiel = ?, imagen = ?
              WHERE id = ?;`,
          [filename, base64data, id]
        );
      } catch (error) {
        console.error(
          "Ocurrio un error al actualizar el Item: ",
          error.message
        );
      }
    }

    const [updateItem] = await connection.query(
      `SELECT * FROM item WHERE id = ?;`,
      [id]
    );
    return updateItem[0];
  }

  static async delete({ id }) {
    const [info] = await connection.query(`
      DELETE FROM item WHERE id = ?;`,
      [id]
    );
    return info;
  }
}
