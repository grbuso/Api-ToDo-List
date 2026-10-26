// Lida com HTTP. Lê req, chama o model, responde com status + JSON (req, res, status, JSON)
// Guarda as funções principais
// Só controller fala com o cliente (res)

import { TarefasModel } from "../models/tarefas.model.js";
import {
    CreateTarefaDto,
    UpdateTarefaDto,
    ResponseTarefaDto,
} from "../dtos/tarefas.dto.js";
import { NotFound } from "../errors/errors.js";

export class TarefasController {
    static async listar(req, res) {
        const tarefas = await TarefasModel.listar(); // Chama função do model, substituindo a query SQL
        res.status(200).json(
            tarefas.map((tarefa) => new ResponseTarefaDto(tarefa)),
        );
    }

    static async buscar(req, res) {
        const { id } = req.params;
        const tarefa = await TarefasModel.buscar(id);

        if (!tarefa) throw new NotFound("Tarefa não encontrada");

        res.status(200).json(new ResponseTarefaDto(tarefa));
    }

    static async criar(req, res) {
        const dto = new CreateTarefaDto(req.body);
        const id = await TarefasModel.criar(dto.titulo, dto.concluida);

        res.status(201).json(new ResponseTarefaDto({ id, ...dto }));
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const dto = new UpdateTarefaDto(req.body);
        const linhasAfetadas = await TarefasModel.atualizar(
            id,
            dto.titulo,
            dto.concluida,
        );

        if (linhasAfetadas === 0) throw new NotFound("Tarefa não encontrada");

        res.json({ message: "Tarefa atualizada com sucesso" });
    }

    static async deletar(req, res) {
        const { id } = req.params;
        const linhasAfetadas = await TarefasModel.deletar(id); // Chama funcão do model, substituindo a query SQL

        if (linhasAfetadas === 0) throw new NotFound("Tarefa não encontrada");

        res.json({ message: "Tarefa deletada com sucesso" });
    }
}
