# API Planos

## Requisitos para rodar e debugar
- **Node.js 16+** (projeto usa CommonJS e foi dockerizado com imagem Node 16).
- **npm** (instalação de dependências e scripts).
- **MySQL 5.7+ ou 8+** com acesso ao banco `scconvenios`.
- Variáveis de ambiente em `.env`.

### Exemplo de `.env`
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key
DEFAULT_PER_PAGE_REGISTERS=100

DB_HOST=localhost
DB_PORT=3306
DB_USER=evx
DB_PASSWORD=67yuhjnm*
DB_NAME=scconvenios
```

> Observação: hoje o arquivo `src/models/db.js` usa credenciais fixas no código. Para produção, o ideal é migrar para uso de `process.env`.

## Como rodar
```bash
npm install
npm run dev
```

Servidor sobe em `http://localhost:3000`.

## Como debugar
### Opção 1 (mais simples)
Use `npm run dev` com `nodemon` para reload automático.

### Opção 2 (Node Inspector)
```bash
node --inspect-brk app.js
```
Depois conecte pelo Chrome DevTools (`chrome://inspect`) ou VS Code (configuração attach em porta `9229`).

## Swagger funcionando
A API expõe:
- **JSON OpenAPI:** `GET /api/openapi.json`
- **Swagger UI:** `GET /api/docs`

### Passos
1. Suba a API (`npm run dev`).
2. Abra `http://localhost:3000/api/docs`.
3. Clique em **Authorize** e informe `Bearer <seu_token_jwt>` para testar endpoints protegidos.

> A UI usa assets do CDN `unpkg`. Se seu ambiente bloquear internet, acesse pelo menos `http://localhost:3000/api/openapi.json`.

## Endpoints principais
- `POST /api/login`
- `GET /api/matriculas`
- `GET /api/matriculas/:id`
- `GET /api/matriculas/cpf/:cpf`
- `GET /api/dependentes`
- `GET /api/dependentes/:id`
- `GET /api/health`
