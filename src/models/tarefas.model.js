// Exporta funções
// Só as queries e SQL

import { pool } from "../config/db.js";

export class TarefasModel {
    static async listar() {
        const [rows] = await pool.query("SELECT * FROM tarefas");
        return rows;
    }

    static async buscar(id) {
        const [rows] = await pool.query("SELECT * FROM tarefas WHERE id = ?", [
            id,
        ]);
        return rows[0];
    }

    static async criar(titulo, concluida) {
        const [result] = await pool.query(
            "INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)",
            [titulo, concluida],
        );
        return result.insertId;
    }

    static async atualizar(id, titulo, concluida) {
        const [result] = await pool.query(
            "UPDATE tarefas SET titulo = COALESCE(?, titulo), concluida = COALESCE(?, concluida) WHERE id = ?",
            [titulo ?? null, concluida ?? null, id],
        );
        return result.affectedRows;
    }

    static async deletar(id) {
        const [result] = await pool.query("DELETE FROM tarefas WHERE id = ?", [
            id,
        ]);
        return result.affectedRows;
    }
}
