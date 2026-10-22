// Lida com HTTP. Lê req, chama o model, responde com status + JSON (req, res, status, JSON)
// Guarda as funções principais
// Só controller fala com o cliente (res)

import { TarefasModel } from "../models/tarefas.model.js";
import {
    CreateTarefaDto,
    UpdateTarefaDto,
    ResponseTarefaDto,
} from "../dtos/tarefas.dto.js";

export class TarefasController {
    static async listar(req, res) {
        try {
            const tarefas = await TarefasModel.listar(); // Chama função do model, substituindo a query SQL
            res.status(200).json(
                tarefas.map((tarefa) => new ResponseTarefaDto(tarefa)),
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({ erro: "Falha ao buscar tarefas" });
        }
    }

    static async buscar(req, res) {
        try {
            const { id } = req.params;
            const tarefa = await TarefasModel.buscar(id);
            if (!tarefa)
                return res.status(404).json({ erro: "Tarefa não encontrada" });
            res.status(200).json(new ResponseTarefaDto(tarefa));
        } catch (e) {
            console.error(e);
            res.status(500).json({ erro: "Falha ao buscar tarefa" });
        }
    }

    static async criar(req, res) {
        try {
            const dto = new CreateTarefaDto(req.body);
            const id = await TarefasModel.criar(dto.titulo, dto.concluida);
            res.status(201).json(new ResponseTarefaDto({ id, ...dto }));
        } catch (e) {
            console.error(e);
            res.status(500).json({ erro: "Falha ao criar tarefa" });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dto = new UpdateTarefaDto(req.body);
            const linhasAfetadas = await TarefasModel.atualizar(
                id,
                dto.titulo,
                dto.concluida,
            );

            if (linhasAfetadas === 0)
                return res.status(404).json({ erro: "Tarefa não encontrada" });
            res.json({ message: "Tarefa atualizada com sucesso" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ erro: "Falha ao atualizar tarefa" });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            const linhasAfetadas = await TarefasModel.deletar(id); // Chama funcão do model, substituindo a query SQL

            if (linhasAfetadas === 0)
                return res.status(404).json({ erro: "Tarefa não encontrada" });
            res.json({ message: "Tarefa deletada com sucesso" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ erro: "Falha ao deletar tarefa" });
        }
    }
}
