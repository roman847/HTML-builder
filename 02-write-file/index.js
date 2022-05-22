const fs = require("fs");
const path = require("path");
const process = require("process");

let question = () => {
  process.stdout.write("Enter your text and click Enter> ");
};

let createTextFile = () => {
  fs.writeFile(path.join(__dirname, ".", "text.txt"), "", (err) => {
    if (err) throw err;
  });
};
createTextFile();

process.stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    cancel();
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
function cancel() {
  console.log("\n Good bye...");
  process.exit();
}
process.on("SIGINT", cancel);
question();
