function validateWatched(req, res, next) {
  const { talk } = req.body;
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  const inteiro = Number.isInteger(talk.rate);
  if (!inteiro || talk.rate > 5 || talk.rate <= 0) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
}

module.exports = {
  validateTalk,
  validateRate,
  validateWatched,
};