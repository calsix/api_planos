const express = require('express');
const bodyParser = require('body-parser');
const matriculasRoutes = require('./src/routes/matriculasRoutes');
const dependentesRoutes = require('./src/routes/dependentesRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const openApiSpec = require('./src/docs/openapi');
require('dotenv').config();

const app = express();
const authRoutes = require('./src/routes/authRoutes');

app.use(bodyParser.json());

app.use('/api/matriculas', matriculasRoutes);
app.use('/api/dependentes', dependentesRoutes);
app.use('/api/', authRoutes);

app.get('/api/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

app.get('/api/docs', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: '/api/openapi.json',
        dom_id: '#swagger-ui'
      });
    </script>
  </body>
</html>`);
});

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
