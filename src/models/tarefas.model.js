// Exporta funções
// Só as queries e SQL

import { pool } from "../config/db.js";

export async function listar() {
    const [rows] = await pool.query("SELECT * FROM tarefas");
    return rows;
}

export async function buscar(id) {
    const [rows] = await pool.query("SELECT * FROM tarefas WHERE id = ?", [id]);
    return rows[0];
}

export async function criar(titulo, concluida) {
    const [result] = await pool.query(
        "INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)",
        [titulo, concluida],
    );
    return result.insertId;
}

export async function atualizar(id, titulo, concluida) {
    const [result] = await pool.query(
        "SET titulo = COALESCE(?, titulo), concluida = COALESCE(?, concluida) WHERE id = ?",
        [titulo ?? null, concluida ?? null, id],
    );
    return result.affectedRows;
}

export async function deletar(id) {
    const [result] = await pool.query("DELETE FROM tarefas WHERE id = ?", [id]);
    return result.affectedRows;
}
