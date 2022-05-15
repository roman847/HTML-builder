const fs = require("fs");
const path = require("path");

const textPath = path.join(__dirname, ".", "text.txt");
const stream = new fs.ReadStream(textPath);

stream.on("data", (chunk) => {
  console.log(chunk.toString());
});
