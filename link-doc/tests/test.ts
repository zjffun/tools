const fs = require("fs");
const path = require("path");
import linkDoc from "../src/link-doc";

console.log(__filename, __dirname, process);

const linkjson = linkDoc(
  path.resolve(process.cwd(), "tests/README.zh-CN.md"),
  path.resolve(process.cwd(), "tests/README.md")
);

linkjson.then((d) => {
  fs.writeFileSync(
    path.resolve(process.cwd(), ".link-doc/vue-shopify-reandme.json"),
    JSON.stringify(d, null, 2)
  );
});
