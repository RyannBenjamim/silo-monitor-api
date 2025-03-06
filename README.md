# API de Gerenciamento de Temperatura e Umidade em Silos

Esta API foi desenvolvida para gerenciar a temperatura e a umidade em silos, permitindo o monitoramento e controle desses dados por meio de registros. A API também inclui funcionalidades de autenticação e autorização de usuários, além de permitir a criação, atualização e exclusão de silos e registros associados.

## Funcionalidades Principais

- **Autenticação de Usuários**: Utiliza JWT (JSON Web Tokens) para autenticação e autorização de usuários.
- **Gerenciamento de Silos**: Permite a criação, atualização, exclusão e consulta de silos.
- **Registros de Temperatura e Umidade**: Armazena e recupera dados de temperatura e umidade associados a cada silo.
- **Proteção de Rotas**: Utiliza middlewares para proteger rotas sensíveis, garantindo que apenas usuários autenticados possam acessá-las.

## Stacks Utilizadas

- **Backend**: Desenvolvido com **Node.js** e **Express**, proporcionando uma base robusta e escalável para a API.
- **Banco de Dados**: Utiliza **PostgreSQL** como banco de dados relacional, garantindo alta performance e confiabilidade no armazenamento de dados.
- **ORM**: **Prisma ORM** é utilizado para gerenciar as operações de banco de dados, oferecendo uma camada de abstração segura e produtiva para interações com o PostgreSQL.
- **Autenticação**: Implementação de autenticação e autorização com **JWT (JSON Web Tokens)**, garantindo segurança e controle de acesso às rotas protegidas.

## Diagrama do Banco de Dados

![Capturar](https://github.com/user-attachments/assets/54c4ead1-93ed-4a9a-b843-5fbd79648fa8)

## Endpoints

### Autenticação

- **POST /users/login**
  - **Descrição**: Faz login de um usuário na aplicação.
  - **Parâmetros (body)**:
    ```json
    {
      "username": "johndoe",
      "password": "john123"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Login efetuado com sucesso",
      "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZ1bGFub29vb29vb29vb28iLCJpYXQiOjE3NDA5MjEwMzgsImV4cCI6MTc0MDkyMjgzOH0.4KFFXssrdFFGtzf5i6Nx9MfyiboE5gDrXkKnHSvQbJQ",
          "id": "9131b5b6-cda6-4c2b-b365-a930512e0a43"
      }
    }
    ```

### Usuários

- **POST /users**
  - **Descrição**: Cria um novo usuário.
  - **Parâmetros (body)**:
    ```json
    {
      "username": "johndoe",
      "password": "john123",
      "role": "standard"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "data": {
          "id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
          "username": "johndoe",
          "role": "STANDARD"
      }
    }
    ```

- **GET /users**
  - **Descrição**: Lista todos os usuários.
  - **Exemplo de Resposta**:
    ```json
    {
      "data": [
          {
              "id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
              "username": "johndoe",
              "role": "STANDARD",
          }
      ]
    }
    ```
    
- **GET /users/:id**
  - **Descrição**: Retorna os dados de um usuário específico com base no ID.
  - **Exemplo de Resposta**:
    ```json
    {
      "data": {
          "id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
          "username": "johndoe",
          "role": "STANDARD",
          "created_at": "2025-03-02T13:09:57.966Z",
          "updated_at": "2025-03-02T13:09:57.966Z"
      }
    }
    ```
    
- **PUT /users/:id**
  - **Descrição**: Atualiza os dados de um usuário específico com base no ID.
  - **Parâmetros (body)**:
    ```json
    {
      "role": "admin"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Dados do suário atualizado com sucesso.",
      "data": {
          "id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
          "username": "janedoe",
          "role": "ADMIN"
      }
    }
    ```

- **DELETE /users/:id**
  - **Descrição**: Remove um usuário específico com base no ID.
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Usuário deletado com sucesso.",
      "data": {
          "id": "58122cea-194f-4602-8294-8735cfd3dd0d"
      }
    }
    ```

### Silos

- **POST /silos**
  - **Descrição**: Cria um novo silo.
  - **Parâmetros (body)**:
    ```json
    {
      "user_id": "8bff695f-9ee1-4bf5-aa7a-52a43de712ab"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Silo criado com sucesso.",
      "data": {
          "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984"
      }
    }
    ```

- **GET /silos**
  - **Descrição**: Lista todos os silos ou apenas os silos de um usuário específico.
  - **Query Params**:
    - `user_id`: Filtra os silos por usuário.
  - **Exemplo de Resposta**:
    ```json
    {
      "data": [
          {
              "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984",
              "status": "ACTIVE",
              "user_id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
          }
      ]
    }
    ```

- **GET /silos/:id**
  - **Descrição**: Retorna os dados de um silo específico com base no ID.
  - **Exemplo de Resposta**:
    ```json
    {
      "data": {
          "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984",
          "status": "ACTIVE",
          "user_id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
          "created_at": "2025-03-02T13:21:39.033Z",
          "updated_at": "2025-03-02T13:21:39.033Z"
      }
    }
    ```

- **PUT /silos/:id**
  - **Descrição**: Atualiza o status de um silo específico com base no ID.
  - **Parâmetros (body)**:
    ```json
    {
      "status": "inactive"
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Status atualizado com sucesso.",
      "data": {
        "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984",
        "status": "inactive",
        "user_id": "9131b5b6-cda6-4c2b-b365-a930512e0a43",
      }
    }
    ```

- **DELETE /silos/:id**
  - **Descrição**: Remove um silo específico com base no ID.
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Silo deletado com sucesso.",
      "data": {
          "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984"
      }
    }
    ```

### Registros

- **POST /registers**
  - **Descrição**: Cria um novo registro de temperatura e umidade.
  - **Parâmetros (body)**:
    ```json
    {
      "silo_id": "dd6ee783-0db3-44ee-bcb30cd8410406",
      "temperature": 23.5,
      "humidity": 40.5
    }
    ```
  - **Exemplo de Resposta**:
    ```json
    {
      "message": "Registro criado com sucesso.",
      "data": {
          "id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984"
      }
    }
    ```

- **GET /registers/silos/:silo_id**
  - **Descrição**: Lista todos os registros de um silo ou apenas o último registro.
  - **Query Params**:
    - `last=true`: Retorna apenas o último registro.
  - **Exemplo de Resposta**:
    ```json
     {
      "data": [
          {
              "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
              "temperature": 25.50,
              "humidity": 60.00,
              "silo_id": "9d32b1e6-33c2-4ae9-9c3d-48fc26286984",
              "created_at": "2025-03-02T13:21:39.033Z"
          }
      ]
    }
    ```

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- NPM (Node Package Manager) instalado
- Banco de dados configurado (MySQL, PostgreSQL, etc.)

### Passos para execução

1. Clone este repositório:

```env
git clone https://github.com/RyannBenjamim/silo-monitor-ap
```

2. Instale as dependências:

```env
npm install
```

3. Inicie o servidor:

```env
npm run dev
```

## Contato

Se você tiver alguma dúvida ou sugestão sobre este projeto, sinta-se à vontade para entrar em contato com Ryan Costa Benjamim via [meu site](https://ryancostaportfolio.netlify.app/)

Espero que este README ajude você a entender melhor o projeto.
