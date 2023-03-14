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

module.exports = {
  readTalkerData,
};