const express = require('express');
const dependentesController = require('../controllers/dependentesController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, dependentesController.getDependentes);
router.get('/:id', authenticateToken, dependentesController.getDependenteById);

module.exports = router;
