import { connection } from "../utils/connectionBD.js";

export class ModelLogin {
  static async create({ input }) {
    console.log("model: ", input)
    const [user] = await connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [input]
    );

    return user[0];
  }

  static async getById({ id }) {}
}
