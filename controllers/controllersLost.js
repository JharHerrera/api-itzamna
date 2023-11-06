import { LostModel } from "../models/modelsLost.js";

export class LostController{
    static async getAll(req, res){
        const {result} = req.body
        const data = await LostModel.getAll({result})
        res.json(data)
    }
}