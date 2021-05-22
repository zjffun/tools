const path = require("path");
import linkDoc from "../dist/link-doc.js";

console.log(__filename, __dirname, process);

linkDoc(
  path.resolve(__dirname, "README.zh-CN.md"),
  path.resolve(__dirname, "README.md"),
  __dirname
);
