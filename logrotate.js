const fs = require('fs');
const [, , fileName, numParam] = process.argv;
const MAX = parseInt(numParam, 10) || 5;

// this gives fileName.ext.1, but not fileName.ext.0
const fileNameNum = (fileName, num) => num
  ? `${fileName}.${num}`
  : fileName;

// recursively rotates files
const rotate = (fileName, max) => {
  const rotate_ = (fileName, index, max) => {
    const nextIndex = index + 1;
    const fromFile = fileNameNum(fileName, index);
    const toFile = fileNameNum(fileName, nextIndex);
    if (fs.existsSync(toFile) && nextIndex < max) {
      rotate_(fileName, nextIndex, max);
    }
    fs.renameSync(fromFile, toFile);
  };
  rotate_(fileName, 0, max);
};

rotate(fileName, MAX);
