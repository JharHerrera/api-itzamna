import { connection } from "../utils/connectionBD.js";

export class LostModel {
  static async getAll({ imput }) {
    const [result] = await connection.query(`
      SELECT id, name_item, amount, imagen, extrabiado_id, amount_extra FROM item JOIN extraviado
      WHERE item.id = extraviado.item_id
      AND extraviado.amount_extra >= 0;`);
      return result
  }
}
