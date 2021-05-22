const path = require("path");
import utils from "util";
import fs from "fs";
import { exec } from "child_process";

const execAsync = utils.promisify(exec);

var unified = require("unified");
var markdown = require("remark-parse");

const processor = unified().use(markdown);

export default async (filePath, sourceFilePath, dirname) => {
  const fileHash = await execAsync(`git hash-object -- ${filePath}`);
  const sourceHash = await execAsync(`git hash-object -- ${sourceFilePath}`);
  const lines = [];
  const fileContent = fs.readFileSync(filePath).toString();
  const sourceFileContent = fs.readFileSync(sourceFilePath).toString();

  // fileContent.split("\n").forEach((line, i) => {
  //   lines.push({
  //     file: [i, i + 1],
  //     source: [i, i + 1],
  //   });
  // });

  const fileTree = processor().parse(fileContent);
  const sourceTree = processor().parse(sourceFileContent);

  fileTree.children.forEach((child, i) => {
    lines.push({
      file: child.position,
      source: sourceTree.children[i].position,
    });
  });

  const res = {
    filePath: filePath,
    fileHash: fileHash.stdout.trim(),
    sourceFilePath: sourceFilePath,
    sourceHash: sourceHash.stdout.trim(),
    lines,
  };

  console.log(res);

  const fileContentLines = fileContent.split("\n");
  const sourceFileContentLines = sourceFileContent.split("\n");
  fileContentLines.unshift("");
  sourceFileContentLines.unshift("");

  let tfileLine = 0;
  let tsourceFileLine = 0;
  const diffFile = path.resolve(dirname, "diff.txt");
  fs.writeFileSync(diffFile, "");
  res.lines.forEach((line) => {
    if (tsourceFileLine !== line.source.start.line) {
      // fs.appendFileSync(diffFile, "--------ldsourcestart\n");
      while (tsourceFileLine !== line.source.start.line) {
        fs.appendFileSync(
          diffFile,
          sourceFileContentLines[tsourceFileLine] + "\n"
        );
        tsourceFileLine++;
      }
      // fs.appendFileSync(diffFile, "--------ldsourceend\n");
    }

    if (tfileLine !== line.file.start.line) {
      // fs.appendFileSync(diffFile, "--------ldfilestart\n");
      while (tfileLine !== line.file.start.line) {
        fs.appendFileSync(diffFile, fileContentLines[tfileLine] + "\n");
        tfileLine++;
      }
      // fs.appendFileSync(diffFile, "--------ldfileend\n");
    }

    fs.appendFileSync(diffFile, "<<<<<<< source --- aaaa --------ldsourcestart\n");
    // fs.appendFileSync(diffFile, "--------ldsourcestart\n");
    while (tsourceFileLine <= line.source.end.line) {
      fs.appendFileSync(
        diffFile,
        sourceFileContentLines[tsourceFileLine] + "\n"
      );
      tsourceFileLine++;
    }
    // fs.appendFileSync(diffFile, "--------ldsourceend\n");

    fs.appendFileSync(diffFile, "=======\n");

    // fs.appendFileSync(diffFile, "--------ldfilestart\n");
    while (tfileLine <= line.file.end.line) {
      fs.appendFileSync(diffFile, fileContentLines[tfileLine] + "\n");
      tfileLine++;
    }
    // fs.appendFileSync(diffFile, "--------ldfileend\n");
    fs.appendFileSync(diffFile, ">>>>>>> file --- aaa\n");
  });

  return res;
};
