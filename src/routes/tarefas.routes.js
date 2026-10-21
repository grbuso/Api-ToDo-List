// Define GET/POST/PUT/DELETE e aponta para o controller

import { Router } from "express";
import * as tarefasController from "../controllers/tarefas.controller.js";

const router = Router();
router.get("/", tarefasController.listar);
router.get("/:id", tarefasController.buscar);
router.post("/", tarefasController.criar);
router.put("/:id", tarefasController.atualizar);
router.delete("/:id", tarefasController.deletar);

export default router;
