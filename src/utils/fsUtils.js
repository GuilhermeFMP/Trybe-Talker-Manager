const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const talker = JSON.parse(data);

    return talker;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function readTalkerById(id) {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const talker = JSON.parse(data);

    return talker.find((talk) => talk.id === id);
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
}

async function writeTalker(talker) {
  try {
    const oldTalkers = await readTalkerData();
    const newTalkerOBJ = {
      id: oldTalkers[oldTalkers.length - 1].id + 1,
      ...talker,
    };
    const allTalkers = JSON.stringify([
      ...oldTalkers,
      newTalkerOBJ,
    ], null, 2);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalkers);
    return newTalkerOBJ;
  } catch (error) {
    console.error(`Erro na escrrita do arquivo: ${error}`);
  }
}

async function updateTalkers(id, updatedTalkerData) {
  const { name, age, talk } = updatedTalkerData;
  const oldTalkers = await readTalkerData();
  const updateTalker = { name, age, id, talk };
  if (!oldTalkers.find((talks) => talks.id === id)) {
    return [];
  }
  const updated = oldTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === updateTalker.id) return [...talkersList, updateTalker];
    return [...talkersList, currentTalker];
  }, []);
  const updateData = JSON.stringify(updated, null, 2);
  try {
    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updateData);
    return updateTalker;
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

async function deleteTalker(id) {
  const oldTalkers = await readTalkerData();
  const updatedTalker = oldTalkers.filter((talk) => talk.id !== id);
  const updateData = JSON.stringify(updatedTalker, null, 2);
  try {
    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updateData);
  } catch (error) {
    console.error(`Erro na remoção do arquivo: ${error}`);
  }
}

async function filterTalker(terms) {
  let talkers = await readTalkerData();
  const filters = Object.keys(terms);
  filters.forEach((filter) => {
    if (filter === 'q') {
      talkers = talkers.filter((talk) => talk.name.toLowerCase().includes(terms.q.toLowerCase()));
    }
    if (filter === 'date') {
      talkers = talkers.filter((talk) => talk.talk.watchedAt.toLowerCase()
        .includes(terms.date.toLowerCase()));
    }
    if (filter === 'rate') {
      talkers = talkers.filter((talk) => talk.talk.rate === Number(terms.rate));
    }
  });
  return talkers;
}

async function changeRate(id, rate) {
  console.log(rate);
  const oldTalkers = await readTalkerData();
  const talker = oldTalkers.find((talk) => talk.id === id);
  talker.talk.rate = rate;
  console.log(talker);
  const updated = oldTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === talker.id) return [...talkersList, talker];
    return [...talkersList, currentTalker];
  }, []);
  const updateData = JSON.stringify(updated, null, 2);
  try {
    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updateData);
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

module.exports = {
  readTalkerData,
  readTalkerById,
  writeTalker,
  updateTalkers,
  deleteTalker,
  filterTalker,
  changeRate,
};