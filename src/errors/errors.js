export class ErroApp extends Error {
    constructor(mensagem, status) {
        super(mensagem);
        this.status = status;
    }
}

export class NotFound extends ErroApp {
    constructor(mensagem = "Pedido não encontrado") {
        super(mensagem, 404);
    }
}

export class BadRequest extends ErroApp {
    constructor(mensagem = "Entrada inválida") {
        super(mensagem, 400);
    }
}
