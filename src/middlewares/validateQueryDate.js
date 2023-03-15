const { readTalkerData } = require('../utils/fsUtils');

async function validateQueryDate(req, res, next) {
  const terms = Object.keys(req.query);
  if (terms.includes('date')) {
    if (!req.query.date) {
      const talkers = await readTalkerData();
      return res.status(200).json(talkers);
    }
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(req.query.date)) {
      return res.status(400).json(
        { message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' },
      );
    }
  return next();
  }
  next();
}

module.exports = validateQueryDate;