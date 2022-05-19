const fs = require("fs");
const path = require("path");
const process = require("process");
const fsPromises = fs.promises;

async function createCopyDir() {
  createCopy();
  await removeFilesCopy();
  readAndWriteCopyFiles();
}
createCopyDir();

function createCopy() {
  fsPromises
    .mkdir(path.join(__dirname, "files-copy"), { recursive: true })
    .catch(() => {
      console.log("failed to create directory");
    });
}

function removeFilesCopy() {
  fs.readdir(path.join(__dirname, "files-copy"), (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
      fs.unlink(path.join(__dirname, "files-copy", `${file}`), (err) => {
        if (err) throw err;
      });
    });
  });
}

function readAndWriteCopyFiles() {
  const pathDir = path.join(__dirname, "files");

  fs.readdir(pathDir, (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
      fs.writeFile(path.join(__dirname, "files-copy", `${file}`), "", (err) => {
        if (err) throw err;
      });
    });
  });
}
