function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  const ageType = typeof age;
  const inteiro = Number.isInteger(age);
  if (Number(age) <= 18 || ageType !== 'number' || !inteiro) {
    return res.status(400).json(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  next();
}

module.exports = validateAge;