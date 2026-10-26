import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tarefasRoutes from "./routes/tarefas.routes.js";
import { ErrorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/tarefas", tarefasRoutes);

// Erros
app.use(ErrorHandler.missingRoute);
app.use(ErrorHandler.handler);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
