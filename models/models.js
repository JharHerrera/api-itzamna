import { json } from "express";
import { connection } from "../utils/connectionBD.js";
import { encrypt } from "../utils/securityPass.js";
import { clean } from "../utils/cleanObject.js";

export class ModelUser {
  static async getAll({ result }) {
    const [info, table] = await connection.query(
      `select name, cellphone, email, passwordHash, BIN_TO_UUID(id) id from user;`
    );
    return info;
  }

  static async getByid({ id }) {
    const [info] = await connection.query(
      `select name, cellphone, email, passwordHash, BIN_TO_UUID(id) id 
        FROM user WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (info.length === 0) return null;
    return info[0];
  }

  static async create({ input }) {
    const { name, cellphone, email, password } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    const passwordHash = await encrypt(password);

    try {
      await connection.query(
        `INSERT INTO user (id, name, cellphone, email, passwordHash)
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);`,
        [uuid, name, cellphone, email, passwordHash]
      );
    } catch (e) {
      console.error("Ocurrió un error:", e.message);
    }

    const [user] = await connection.query(
      `select name, cellphone, email, passwordHash, BIN_TO_UUID(id) id
        FROM user WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return user[0];
  }

  static async update({ id, input }) {
    try {
      await connection.query(
        `UPDATE user SET ? 
          WHERE id = UUID_TO_BIN(?);`,
        [input, id]
      );
    } catch (error) {
      console.error("Ocurrió un error al actualizar al usuario:", error.message);
    }

    if (input.passwordHash) {
      const newPasswordHash = await encrypt(input.passwordHash);
      console.log("del if", newPasswordHash);
      try {
        await connection.query(
          `UPDATE user SET passwordHash = ?
            WHERE id = UUID_TO_BIN(?);`,
          [newPasswordHash, id]
        );
      } catch (error) {
        console.error("Ocurrió un error al actualizar al usuario:", error.message);
      }
    }

    const [updateUser] = await connection.query(
      `select name, cellphone, email, passwordHash, BIN_TO_UUID(id) id 
        FROM user WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return updateUser[0];
  }

  static async delete({ id }) {
    const result = await connection.query(
      `DELETE FROM user WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    return result;
  }
}
