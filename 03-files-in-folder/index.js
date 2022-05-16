const fs = require("fs");
const path = require("path");
const process = require("process");

fs.readdir(`${__dirname}/secret-folder`, (err, data) => {
  if (err) throw err;
  let str = "";

  data.forEach((file) => {
    let obj = path.parse(file);

    fs.stat(path.join(__dirname, "secret-folder", file), (err, stats) => {
      if (err) throw err;
      if (!stats.isDirectory()) {
        str = `${obj.name} - ${obj.ext.slice(1)} - ${stats.size}`;
        console.log(str);
      }
    });
  });
});
