"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var link_doc_1 = __importDefault(require("../src/link-doc"));
console.log(__filename, __dirname, process);
var linkjson = link_doc_1["default"](path.resolve(process.cwd(), "tests/README.zh-CN.md"), path.resolve(process.cwd(), "tests/README.md"));
linkjson.then(function (d) {
    fs.writeFileSync(path.resolve(process.cwd(), ".link-doc/vue-shopify-reandme.json"), JSON.stringify(d, null, 2));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3RzL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLDZEQUFzQztBQUV0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFNUMsSUFBTSxRQUFRLEdBQUcscUJBQU8sQ0FDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsRUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FDL0MsQ0FBQztBQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDO0lBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxvQ0FBb0MsQ0FBQyxFQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQzNCLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9