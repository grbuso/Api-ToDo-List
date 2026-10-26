import { ErroApp } from "../errors/errors.js";
import { NotFound } from "../errors/errors.js";

export class ErrorHandler {
    static missingRoute = (req, res, next) => {
        next(new NotFound("Rota não encontrada"));
    };

    static handler = (err, req, res, next) => {
        if (err instanceof ErroApp) {
            return res.status(err.status).json({ erro: err.message }); // Erro conhecido -> mostra
        }
        console.log(err);
        res.status(500).json({ erro: "Erro interno do servidor" }); // Erro desconhecido -> detalhes só no log
    };
}
