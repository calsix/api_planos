# Documentação da API

## Visão Geral
Esta API oferece funcionalidades relacionadas à autenticação de usuários, gerenciamento de 'Matrículas' e manipulação de 'Dependentes'. Construída com Node.js e Express, utiliza JWT para autenticação.

## Autenticação
- **Endpoint**: `/login`
- **Método**: POST
- **Descrição**: Autentica um usuário verificando seu nome de usuário e senha contra um banco de dados. Em caso de autenticação bem-sucedida, retorna um token JWT.
- **Corpo da Requisição**:
  - `username`: Nome de usuário
  - `password`: Senha

## Matrículas
- **Endpoints**:
  - GET `/`: Recupera uma lista paginada de todas as 'Matrículas'.
  - GET `/:id`: Recupera uma 'Matrícula' específica pelo seu ID.
- **Autenticação**: Necessária (Token JWT)
- **Parâmetros de Consulta**:
  - `page`: Número da página para paginação (opcional)
  - `limit`: Número de registros por página (opcional)

## Dependentes
- **Endpoints**:
  - GET `/`: Recupera uma lista paginada de todos os 'Dependentes'.
  - GET `/:id_usuario`: Recupera um 'Dependente' específico pelo ID do usuário.
- **Autenticação**: Necessária (Token JWT)
- **Parâmetros de Consulta**:
  - `page`: Número da página para paginação (opcional)
  - `limit`: Número de registros por página (opcional)

# Documentação de Uso da API

## Autenticação
1. **Login**:
   - **Endpoint**: `/login`
   - **Método**: POST
   - **Corpo**:
     ```json
     {
       "username": "seu_usuario",
       "password": "sua_senha"
     }
     ```
   - **Resposta**: Em caso de sucesso, retorna um token JWT.

## Matrículas
1. **Obter Todas as Matrículas**:
   - **Endpoint**: `/`
   - **Método**: GET
   - **Cabeçalhos**: `Authorization: Bearer <seu_token_jwt>`
   - **Parâmetros de Consulta**: `page`, `limit` (opcional)

2. **Obter Matrícula por ID**:
   - **Endpoint**: `/:id`
   - **Método**: GET
   - **Cabeçalhos**: `Authorization: Bearer <seu_token_jwt>`

## Dependentes
1. **Obter Todos os Dependentes**:
   - **Endpoint**: `/`
   - **Método**: GET
   - **Cabeçalhos**: `Authorization: Bearer <seu_token_jwt>`
   - **Parâmetros de Consulta**: `page`, `limit` (opcional)

2. **Obter Dependente por ID de Usuário**:
   - **Endpoint**: `/:id_usuario`
   - **Método**: GET
   - **Cabeçalhos**: `Authorization: Bearer <seu_token_jwt>`

## Notas
- Substitua `<seu_token_jwt>` pelo token JWT real recebido após o login.
- Os parâmetros de consulta `page` e `limit` são opcionais para paginação. Se não fornecidos, valores padrão serão usados.

Esta documentação fornece um entendimento básico das funcionalidades da sua API e como interagir com ela. Para informações mais detalhadas, incluindo tratamento de erros e formatos específicos de resposta, seria necessário um detalhamento adicional.

## OpenAPI / Swagger
```
openapi: 3.0.0
info:
  title: Simple API
  version: 1.0.0
  description: API for user authentication, managing matriculas, and handling dependentes.

servers:
  - url: http://localhost:3000/api
    description: Local server

paths:
  /login:
    post:
      summary: User authentication
      description: Authenticates a user and returns a JWT token.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Successful authentication
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
        '401':
          description: Invalid credentials

  /matriculas:
    get:
      summary: Get all matriculas
      description: Retrieves a paginated list of matriculas.
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: page
          schema:
            type: integer
        - in: query
          name: limit
          schema:
            type: integer
      responses:
        '200':
          description: A list of matriculas
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Matricula'
        '401':
          description: Unauthorized

  /matriculas/{id}:
    get:
      summary: Get matricula by ID
      description: Retrieves a specific matricula by its ID.
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A single matricula
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Matricula'
        '404':
          description: Matricula not found
        '401':
          description: Unauthorized

  /dependentes:
    get:
      summary: Get all dependentes
      description: Retrieves a paginated list of dependentes.
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: page
          schema:
            type: integer
        - in: query
          name: limit
          schema:
            type: integer
      responses:
        '200':
          description: A list of dependentes
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Dependente'
        '404':
          description: Dependentes not found
        '401':
          description: Unauthorized

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Matricula:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string

```
# api_planos
