const fs = require('fs').promises;
const path = require('path');

const NAME_FILE = 'name.json'

const pathFile = path.join(__dirname, 'oldFiles', NAME_FILE);

const templateObj = (question, answer) => {
  return {
    question: {
      lang: {
        ua: { text: question, imgUrl: '' },
        eng: { text: '', imgUrl: '' },
      },
    },
    answers: [
      {
        isCorrect: true,
        lang: {
          ua: { text: answer, imgUrl: '' },
          eng: { text: '', imgUrl: '' },
        },
      },
      {
        isCorrect: false,
        lang: {
          ua: { text: '', imgUrl: '' },
          eng: { text: '', imgUrl: '' },
        },
      },
      {
        isCorrect: false,
        lang: {
          ua: { text: '', imgUrl: '' },
          eng: { text: '', imgUrl: '' },
        },
      },
      {
        isCorrect: false,
        lang: {
          ua: { text: '', imgUrl: '' },
          eng: { text: '', imgUrl: '' },
        },
      },
    ],
  };
};

const readFile = async pathFile => {
  try {
    const data = await fs.readFile(pathFile);
    const json = data.toString();
    return JSON.parse(json);
  } catch (err) {
    console.log(err.message);
  }
};

const convertFile = async pathFile => {
  const oldFile = await readFile(pathFile);

  const newFile = oldFile.map(({ question, answer }) =>
    templateObj(question, answer)
  );
  return newFile;
};

const saveFile = async () => {
  const res = await convertFile(pathFile);
  const json = JSON.stringify(res)

  const newPath = path.join(__dirname, 'newFiles', `new-${NAME_FILE}`);
  try {
    fs.writeFile(newPath, json)
  } catch (err) {
    console.log(err.message);
  }
};

saveFile();
