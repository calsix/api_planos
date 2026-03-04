const MatriculaService = require('../services/MatriculaService');

exports.getMatriculas = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || process.env.DEFAULT_PER_PAGE_REGISTERS;
    const matriculas = await MatriculaService.getAllMatriculas(page, limit);
    res.json(matriculas);
  } catch (error) {
    next(error);
  }
};

exports.getMatriculaById = async (req, res, next) => {
  try {
    const matricula = await MatriculaService.getMatriculaById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ message: 'Matricula not found' });
    }
    res.json(matricula);
  } catch (error) {
    next(error);
  }
};

exports.getMatriculaByCPF = async (req, res, next) => {
  try {
    const matricula = await MatriculaService.getMatriculaByCPF(req.params.cpf);
    if (!matricula) {
      return res.status(404).json({ message: 'Matricula not found' });
    }
    res.json(matricula);
  } catch (error) {
    next(error);
  }
};


