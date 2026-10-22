class CreateTarefaDto {
    constructor({ titulo, concluida }) {
        this.titulo = titulo.trim();
        this.concluida = concluida ?? false; // Padrão para false se não fornecido
    }
}

class UpdateTarefaDto {
    constructor({ titulo, concluida }) {
        this.titulo = titulo;
        this.concluida = concluida; // Sem padrão para poder gerar um undefined
        // PUT precisa que chegue undefined para virar null no model (COALESCE manterá o valor atual se for null)
    }
}

class ResponseTarefaDto {
    constructor({ id, titulo, concluida }) {
        this.id = id;
        this.titulo = titulo;
        this.concluida = Boolean(concluida); // Retornará false ou true, mesmo que venha 0 ou 1 do banco
    }
}

export { CreateTarefaDto, UpdateTarefaDto, ResponseTarefaDto };
