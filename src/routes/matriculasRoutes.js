const express = require('express');
const matriculasController = require('../controllers/matriculasController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, matriculasController.getMatriculas);
router.get('/:id', authenticateToken, matriculasController.getMatriculaById);
router.get('/cpf/:cpf', authenticateToken, matriculasController.getMatriculaByCPF);

module.exports = router;
