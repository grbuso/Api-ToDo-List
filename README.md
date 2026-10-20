# Api-ToDo-List

## Sobre

API bem básica de lista de tarefas, construída com node.js. Nela é possível listar, adicionar, buscar, atualizar e deletar tarefas (CRUD), usando o MySQL como banco de dados.

## Setup

As dependências usadas e suas versões são: cors (^2.8.6), dotenv (^18.0.8), express(^5.3.0) e mysql2 (^3.24.6). Podem ser instaladas dentro da pasta do projeto usando o comando
`npm install`

Para configurar e criar a database necessária, abra o arquivo `database.sql` no MySQL Workbench ou cole o conteúdo em um arquivo em branco e execute.

Crie um arquivo `.env` e use o conteúdo do exemplo `.env.example` para configurar o ambiente usado pelo código, alterando o necessário.

## Usando a API

Após concluir as etapas de setup, rode o comando `npm run start` dentro da pasta que contém o projeto. O console informará em qual URL o servidor está rodando.

Para realizar as operações CRUD, utilize ferramentas como [Postman](https://www.postman.com/) ou [ReqBin](https://reqbin.com/). Na ferramenta escolhida, insira a URL anteriormente informada pelo console e escolha a operação desejada. Note que para toda operação será necessário o parâmetro de URL `tarefas`.

Como usar cada operação:

- **GET**

    Lista todas as tarefas na database, ordenando-as por ID. Pode ou não conter o segundo parâmetro de ID, que quando incluído, retornará a tarefa específica representada por aquele ID. Exemplos:

    ```
    https://localhost:PORT/tarefas/
    https://localhost:PORT/tarefas/ID
    ```

- **POST**

    Adiciona uma nova tarefa. Não é necessário informar um ID, mas é necessário informar o _body_ da tarefa, em JSON. O _body_ deve conter a chave _titulo_ e pode ou não conter a chave booleana _concluida_, que vem false como padrão (0 para false e 1 para true). Exemplos de _body_:

    ```
    { "titulo": "Tarefa ABC" }
    { "titulo": "Tarefa DEF", "concluida": 0 }
    ```

    ```
    curl --location 'http://localhost:3002/tarefas' \
    --header 'Content-Type: application/json' \
    --data '{ "titulo": "Tarefa ABC" }'
    ```

- **PUT**

    Atualiza uma tarefa já existente. É necessario informar o ID da tarefa e o _body_ contendo a atualização desejada (não é obrigatório atualizar as duas chaves simultâneamente). Caso novos valores para _titulo_ ou _concluida_ não forem informados, os atuais serão mantidos. Exemplos de _body_:

    ```
    { "titulo": "Tarefa Atualizada" }
    { "concluida": 1 }
    ```

    ```
    curl --location --request PUT 'http://localhost:3002/tarefas/1' \
    --header 'Content-Type: application/json' \
    --data '{"titulo": "Tarefa Atualizada", "concluida": 1}'
    ```

- **DELETE**

    Exclui uma tarefa existente. É necessário informar o ID da tarefa, mas não é necessário informar _body_. Exemplos:

    ```
    https://localhost:PORT/tarefas/ID
    ```
