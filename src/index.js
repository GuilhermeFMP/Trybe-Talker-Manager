const express = require('express');
const crypto = require('crypto');
const { readTalkerData, readTalkerById, writeTalker,
    updateTalkers, deleteTalker } = require('./utils/fsUtils');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateAuth = require('./middlewares/validateAuth');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const { validateTalk, validateWatched, validateRate } = require('./middlewares/validateTalk');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkerById(Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

app.post('/talker', validateAuth, validateName,
  validateAge, validateTalk, validateWatched, validateRate, async (req, res) => {
  const newTalker = req.body;
  const newTalkerWithId = await writeTalker(newTalker);
  return res.status(201).json(newTalkerWithId);
});

app.put('/talker/:id', validateAuth, validateName,
validateAge, validateTalk, validateWatched, validateRate, async (req, res) => {
  const { id } = req.params;
  const updatedTalkerData = req.body;
  const updatedTalkers = await updateTalkers(Number(id), updatedTalkerData);
  if (updatedTalkers.length <= 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(updatedTalkers);
});

app.delete('/talker/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
