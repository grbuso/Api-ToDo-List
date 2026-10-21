import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tarefasRoutes from "./routes/tarefas.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/tarefas", tarefasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});
