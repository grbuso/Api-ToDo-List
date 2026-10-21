// Define GET/POST/PUT/DELETE e aponta para o controller

import { Router } from "express";
import { TarefasController } from "../controllers/tarefas.controller.js";

const router = Router();
router.get("/", TarefasController.listar);
router.get("/:id", TarefasController.buscar);
router.post("/", TarefasController.criar);
router.put("/:id", TarefasController.atualizar);
router.delete("/:id", TarefasController.deletar);

export default router;
