// Define GET/POST/PUT/DELETE e aponta para o controller

import { Router } from "express";
import { TarefasController } from "../controllers/tarefas.controller.js";
import { TarefasMiddleware } from "../middlewares/tarefas.middleware.js";

const router = Router();
router.get("/", TarefasController.listar);
router.get("/:id", TarefasMiddleware.verifyIdFormat, TarefasController.buscar);
router.post(
    "/",
    TarefasMiddleware.verifyTituloObrigatorio,
    TarefasMiddleware.verifyConcluida,
    TarefasController.criar,
);
router.put(
    "/:id",
    TarefasMiddleware.verifyIdFormat,
    TarefasMiddleware.verifyBodyPut,
    TarefasMiddleware.verifyTituloOpcional,
    TarefasMiddleware.verifyConcluida,
    TarefasController.atualizar,
);
router.delete(
    "/:id",
    TarefasMiddleware.verifyIdFormat,
    TarefasController.deletar,
);

export default router;
