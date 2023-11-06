import { Router } from "express";
import { UserController } from "../controllers/controllersUsers.js";
import { loginController } from "../controllers/controllersLogin.js";
import { InventoryController } from "../controllers/controllersInventory.js";
import { LostController } from "../controllers/controllersLost.js"
import { upload } from "../middlewares/multer.js";

export const itzamnaRoutes = Router();

itzamnaRoutes.get("/user", UserController.getAll);
itzamnaRoutes.get("/user/:id", UserController.getById);
itzamnaRoutes.post("/user", UserController.create);
itzamnaRoutes.patch("/user/:id", UserController.update);
itzamnaRoutes.delete("/user/:id", UserController.delete);

itzamnaRoutes.post("/login", loginController.create);

itzamnaRoutes.get("/inventory", InventoryController.getAll);
itzamnaRoutes.get("/inventory/search", InventoryController.getByData);
itzamnaRoutes.get("/inventory/filter", InventoryController.getByFilter);
itzamnaRoutes.post("/inventory", upload, InventoryController.create);
itzamnaRoutes.patch("/inventory/:id", upload, InventoryController.update);
itzamnaRoutes.delete("/inventory/:id", InventoryController.delete);

itzamnaRoutes.get("/lost", LostController.getAll);