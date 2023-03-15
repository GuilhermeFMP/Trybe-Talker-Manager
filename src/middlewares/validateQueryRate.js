function validateQueryRate(req, res, next) {
  const terms = Object.keys(req.query);
  if (terms.includes('rate')) {
    const rate = Number(req.query.rate);
    const inteiro = Number.isInteger(rate);
    if (!inteiro || rate > 5 || rate <= 0) {
      return res.status(400).json(
        { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
      );
    }
    return next();
  }
  next();
}

module.exports = validateQueryRate;