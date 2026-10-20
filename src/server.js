import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/tarefas", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tarefas");
        res.status(200).json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao buscar tarefas" });
    }
});

app.get("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM tarefas WHERE id = ?", [
            id,
        ]);

        if (rows.length === 0)
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.status(200).json(rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao buscar tarefa" });
    }
});

app.post("/tarefas", async (req, res) => {
    try {
        const { titulo } = req.body;
        const [result] = await pool.query(
            "INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)",
            // Na interpolação, ?? ao invés de || porque afeta apenas null e undefined
            [titulo, concluida ?? false],
        );

        res.status(201).json({ id: result.insertId, titulo });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao adicionar tarefa" });
    }
});

app.put("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, concluida } = req.body;
        const [result] = await pool.query(
            // COEALESCE é usado para alternar entre o valor informado e o atual
            "UPDATE tarefas SET titulo = COALESCE(?, titulo), concluida = COALESCE(?, concluida) WHERE id = ?",
            [titulo ?? null, concluida ?? null, id],
        );

        if (result.affectedRows === 0)
            // Se não houver tarefas alteradas, retornar 404
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.json({ message: "Tarefa atualizada com sucesso" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao atualizar tarefa" });
    }
});

app.delete("/tarefas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM tarefas WHERE id = ?", [
            id,
        ]);

        if (result.affectedRows === 0)
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.json({ message: "Tarefa deletada com sucesso" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao deletar tarefa" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});
