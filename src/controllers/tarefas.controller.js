// Lida com HTTP. Lê req, chama o model, responde com status + JSON (req, res, status, JSON)
// Guarda as funções principais
// Só controller fala com o cliente (res)

import * as tarefasModel from "../models/tarefas.model.js";

export async function listar(req, res) {
    try {
        const tarefas = await tarefasModel.listar(); // Chama função do model, substituindo a query SQL
        res.status(200).json(tarefas);
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao buscar tarefas" });
    }
}

export async function buscar(req, res) {
    try {
        const { id } = req.params;
        const tarefa = await tarefasModel.buscar(id);
        if (!tarefa)
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.status(200).json(tarefa);
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao buscar tarefa" });
    }
}

export async function criar(req, res) {
    try {
        const { titulo, concluida } = req.body;
        const id = await tarefasModel.criar(titulo, concluida ?? false);
        res.status(201).json({ id, titulo });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao criar tarefa" });
    }
}

export async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { titulo, concluida } = req.body;
        const linhasAfetadas = await tarefasModel.atualizar(
            id,
            titulo,
            concluida,
        );

        if (linhasAfetadas === 0)
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.json({ message: "Tarefa atualizada com sucesso" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao atualizar tarefa" });
    }
}

export async function deletar(req, res) {
    try {
        const { id } = req.params;
        const linhasAfetadas = await tarefasModel.deletar(id); // Chama funcão do model, substituindo a query SQL

        if (linhasAfetadas === 0)
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        res.json({ message: "Tarefa deletada com sucesso" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ erro: "Falha ao deletar tarefa" });
    }
}
