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

module.exports = {
  readTalkerData,
  readTalkerById,
  writeTalker,
};