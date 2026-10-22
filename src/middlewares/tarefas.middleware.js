export class TarefasMiddleware {
    // Middleware validação do ID
    static verifyIdFormat = (req, res, next) => {
        const { id } = req.params;
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ erro: "Formato de ID inválido" });
        }
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
        ) {
            return res
                .status(400)
                .json({ erro: "Formato de título inválido ou ausente" });
        }
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
        ) {
            return res.status(400).json({ erro: "Formato de título inválido" });
        }
        next();
    };

    // Middleware validação concluida
    static verifyConcluida = (req, res, next) => {
        const { concluida } = req.body;
        if (concluida !== undefined && typeof concluida !== "boolean") {
            return res
                .status(400)
                .json({ erro: "Formato de 'concluída' inválido" });
        }
        next();
    };

    // Middleware checar body PUT
    static verifyBodyPut = (req, res, next) => {
        const { titulo, concluida } = req.body;
        if (titulo === undefined && concluida === undefined) {
            return res.status(400).json({
                erro: "É necessário fornecer pelo menos um campo para atualizar",
            });
        }
        next();
    };
}
