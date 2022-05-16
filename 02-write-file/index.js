const fs = require("fs");
const path = require("path");
const process = require("process");

let question = () => {
  process.stdout.write("Enter your text > ");
};

let createTextFile = () => {
  fs.writeFile(path.join(__dirname, ".", "text.txt"), "", (err) => {
    if (err) throw err;
  });
};
createTextFile();

process.stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    console.log("Good bye...");
    process.exit();
  } else {
    fs.appendFile(
      path.join(__dirname, ".", "text.txt"),
      `${data.toString()}`,
      (err) => {
        if (err) throw err;
      }
    );
  }
});
question();
