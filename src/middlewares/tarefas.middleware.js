import { BadRequest } from "../errors/errors.js";

export class TarefasMiddleware {
    // Middleware validação do ID
    static verifyIdFormat = (req, res, next) => {
        const { id } = req.params;
        if (
            !Number.isInteger(Number(id)) ||
            Number(id) <= 0 ||
            id === undefined
        )
            throw new BadRequest("Formato de ID inválido");
        next();
    };

    // Middleware validação titulo PARA POST
    static verifyTituloObrigatorio = (req, res, next) => {
        const { titulo } = req.body;
        if (
            !titulo ||
            typeof titulo !== "string" ||
            titulo.length > 100 ||
            titulo.trim() === ""
        )
            throw new BadRequest("Formato de título inválido ou ausente");
        next();
    };

    // Middleware validação titulo PARA PUT
    static verifyTituloOpcional = (req, res, next) => {
        const { titulo } = req.body;
        if (
            titulo !== undefined &&
            (typeof titulo !== "string" ||
                titulo.length > 100 ||
                titulo.trim() === "")
        )
            throw new BadRequest("Formato de título inválido");
        next();
    };

    // Middleware validação concluida
    static verifyConcluida = (req, res, next) => {
        const { concluida } = req.body;
        if (concluida !== undefined && typeof concluida !== "boolean")
            throw new BadRequest("Formato de 'concluida' inválido");
        next();
    };

    // Middleware checar body PUT
    static verifyBodyPut = (req, res, next) => {
        const { titulo, concluida } = req.body;
        if (titulo === undefined && concluida === undefined)
            throw new BadRequest(
                "É necessário fornecer pelo menos um campo para atualizar",
            );
        next();
    };
}
