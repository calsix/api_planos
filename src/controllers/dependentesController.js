const DependenteService = require('../services/DependenteService');

exports.getDependentes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || process.env.DEFAULT_PER_PAGE_REGISTERS;
    const dependentes = await DependenteService.getAllDependentes(page, limit);
    res.json(dependentes);
  } catch (error) {
    next(error);
  }
};

exports.getDependenteById = async (req, res, next) => {
  try {
    const dependentes = await DependenteService.getDependenteById(req.params.id);
    if (!dependentes) {
      return res.status(404).json({ message: 'Dependente not found' });
    }
    res.json(dependentes);
  } catch (error) {
    next(error);
  }
};
