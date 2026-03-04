const express = require('express');
const bodyParser = require('body-parser');
const matriculasRoutes = require('./src/routes/matriculasRoutes');
const dependentesRoutes = require('./src/routes/dependentesRoutes');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();

const app = express();
const authRoutes = require('./src/routes/authRoutes');

app.use(bodyParser.json());

app.use('/api/matriculas', matriculasRoutes);
app.use('/api/dependentes', dependentesRoutes);
app.use('/api/', authRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
