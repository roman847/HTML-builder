const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;

const pathAssets = path.join(__dirname, "assets");
const projectDistPath = path.join(__dirname, "project-dist");

// Create copy assets
async function createDirectoriesAssetsAndDir() {
  await creatDirectory(projectDistPath);
  await creatDirectory(path.join(`${__dirname}/project-dist`, "assets"));
  await createCopyFiles(pathAssets);
  await createHTML("/components");
  await buildStyleFile();
}
createDirectoriesAssetsAndDir();

function createCopyFiles(pathAssets) {
  fs.readdir(pathAssets, (err, data) => {
    if (err) throw err;

    data.forEach((file) => {
      reedAssetsFiles(file);
    });
  });
}

// Create dir project-dist

async function creatDirectory(pathDir) {
  await fsPromises.mkdir(pathDir, { recursive: true }).catch(() => {
    console.log("failed to create directory");
  });
}

//Read assets files
function reedAssetsFiles(file) {
  fs.stat(pathAssets, (err, stats) => {
    if (err) throw err;
    if (stats.isDirectory()) {
      let pathFile = path.join(pathAssets + "\\" + file);

      creatDirectory(projectDistPath + "\\" + "assets" + "\\" + file);

      fs.readdir(pathFile, (err, data) => {
        if (err) throw err;
        writeAssetsFile(data, pathFile, file);
      });
    }
  });
}

//Wrtie files from assets into project-dist
function writeAssetsFile(data, pathFile, file) {
  data.forEach((el) => {
    fs.readFile(pathFile + "\\" + el, "utf8", (err, data) => {
      if (err) throw err;
      const writeStream = new fs.createWriteStream(
        projectDistPath + "\\" + "assets" + "\\" + file + "\\" + el
      );
      const readStream = new fs.createReadStream(pathFile + "\\" + el);
      readStream.on("data", (chunk) => {
        writeStream.write(chunk);
      });
    });
  });
}

//Create html
async function createHTML(directory) {
  const writeHtmlStream = fs.createWriteStream(projectDistPath + "/index.html");
  let template = await fsPromises.readFile(
    __dirname + "/template.html",
    "utf8"
  );
  const filesHTML = await fsPromises.readdir(__dirname + directory);

  for (const fileHTML of filesHTML) {
    if (path.parse(__dirname + directory + fileHTML).ext == ".html") {
      let fName = path.parse(__dirname + directory + "\\" + fileHTML).name;

      const readStream = await fsPromises.readFile(
        __dirname + directory + "\\" + fileHTML,
        "utf8"
      );
      const regex = new RegExp(`{{${fName}}}`);
      template = template.replace(regex, readStream);
    }
  }
  buildHTML(template, "index.html");
}

//Build Html
function buildHTML(template, file) {
  const writeStream = fs.createWriteStream(projectDistPath + "\\" + file);
  writeStream.write(template, "utf8");
  writeStream.end();
}

//Creat style.css

async function buildStyleFile() {
  const pathStyles = path.join(__dirname + "\\" + "styles");
  const pathBundle = path.join(projectDistPath, "", "style.css");
  const writeStream = new fs.createWriteStream(pathBundle);
  await fs.readdir(pathStyles, (err, data) => {
    if (err) throw err;
    data.forEach((file, err) => {
      let obj = path.parse(file);
      if (obj.ext.trim() === ".css") {
        const filePath = `${pathStyles}/${obj.base}`;
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) throw err;
          const readStream = new fs.createReadStream(filePath);
          readStream.on("data", (chunk) => {
            writeStream.write(chunk);
          });
        });
      }
    });
  });
}
