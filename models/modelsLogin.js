import { json } from "express";
import { connection } from "../utils/connectionBD.js";
import {compare} from '../utils/securityPass.js'
import {tokenSing} from '../utils/generateToken.js'

export class ModelLogin {
  static async create({ input }) {
    const { email} = input;
    // console.log("modelo", email, " ", password);
    const [user] = await connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    
    return user[0]
  }

  static async getById({id}){
    
  }
}
 