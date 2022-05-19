const fs = require("fs");
const path = require("path");
const process = require("process");

pathDirStyles = path.join(__dirname, "styles");
pathBundle = path.join(__dirname, "project-dist", "bundle.css");

const writeStream = new fs.createWriteStream(pathBundle);

let styles = "";

(async function sortStyleFile() {
  await fs.readdir(pathDirStyles, (err, data) => {
    if (err) throw err;

    data.forEach((file, err) => {
      let obj = path.parse(file);

      if (obj.ext.trim() === ".css") {
        const filePath = `${pathDirStyles}/${obj.base}`;

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
})();
