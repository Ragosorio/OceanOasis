import { Router } from "express";
import {AnimalController} from "../controllers/animals.js";

export const animalsRouter = Router()

animalsRouter.get("/", AnimalController.getAll)
animalsRouter.get("/:id", AnimalController.getById)
animalsRouter.post("/", AnimalController.create)
animalsRouter.delete("/:id", AnimalController.delete)
animalsRouter.patch("/:id", AnimalController.update)