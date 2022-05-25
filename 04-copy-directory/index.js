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

async function readAndWriteCopyFiles() {
  const pathDir = path.join(__dirname, "files");
  const files = await fsPromises.readdir(pathDir);
  for (let file of files) {
    let srcFilePath = path.join(pathDir, `${file}`);
    let copyFiles = path.join(path.join(__dirname, "files-copy", `${file}`));
    await fsPromises.copyFile(srcFilePath, copyFiles);
  }
}
