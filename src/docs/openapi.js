module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API Planos',
    version: '1.0.0',
    description: 'API para autenticação, matrículas e dependentes.'
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health check da API',
        responses: {
          200: {
            description: 'API operacional'
          }
        }
      }
    },
    '/login': {
      post: {
        summary: 'Autenticar usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Token JWT gerado' },
          401: { description: 'Credenciais inválidas' }
        }
      }
    },
    '/matriculas': {
      get: {
        summary: 'Listar matrículas paginadas',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } }
        ],
        responses: {
          200: { description: 'Lista de matrículas' },
          401: { description: 'Não autenticado' },
          403: { description: 'Token inválido' }
        }
      }
    },
    '/matriculas/{id}': {
      get: {
        summary: 'Buscar matrícula por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Matrícula encontrada' },
          404: { description: 'Matrícula não encontrada' }
        }
      }
    },
    '/matriculas/cpf/{cpf}': {
      get: {
        summary: 'Buscar matrícula por CPF',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'path', name: 'cpf', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Matrícula encontrada' },
          404: { description: 'Matrícula não encontrada' }
        }
      }
    },
    '/dependentes': {
      get: {
        summary: 'Listar dependentes paginados',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } }
        ],
        responses: {
          200: { description: 'Lista de dependentes' },
          401: { description: 'Não autenticado' },
          403: { description: 'Token inválido' }
        }
      }
    },
    '/dependentes/{id}': {
      get: {
        summary: 'Buscar dependentes por ID de plano pessoa',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Dependentes encontrados' },
          404: { description: 'Dependente não encontrado' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
