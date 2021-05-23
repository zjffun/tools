"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path = require("path");
var util_1 = __importDefault(require("util"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var execAsync = util_1["default"].promisify(child_process_1.exec);
var unified = require("unified");
var markdown = require("remark-parse");
var processor = unified().use(markdown);
exports["default"] = (function (filePath, sourceFilePath) { return __awaiter(void 0, void 0, void 0, function () {
    var fileHash, sourceHash, lines, fileContent, sourceFileContent, fileTree, sourceTree, res, fileContentLines, sourceFileContentLines, tfileLine, tsourceFileLine, diffFile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execAsync("git hash-object -- " + filePath)];
            case 1:
                fileHash = _a.sent();
                return [4 /*yield*/, execAsync("git hash-object -- " + sourceFilePath)];
            case 2:
                sourceHash = _a.sent();
                lines = [];
                fileContent = fs_1["default"].readFileSync(filePath).toString();
                sourceFileContent = fs_1["default"].readFileSync(sourceFilePath).toString();
                fileTree = processor().parse(fileContent);
                sourceTree = processor().parse(sourceFileContent);
                fileTree.children.forEach(function (child, i) {
                    lines.push({
                        file: child.position,
                        source: sourceTree.children[i].position
                    });
                });
                res = {
                    filePath: filePath,
                    fileHash: fileHash.stdout.trim(),
                    sourceFilePath: sourceFilePath,
                    sourceHash: sourceHash.stdout.trim(),
                    lines: lines
                };
                console.log(res);
                fileContentLines = fileContent.split("\n");
                sourceFileContentLines = sourceFileContent.split("\n");
                fileContentLines.unshift("");
                sourceFileContentLines.unshift("");
                tfileLine = 0;
                tsourceFileLine = 0;
                diffFile = path.resolve(process.cwd(), ".link-doc/diff.txt");
                fs_1["default"].writeFileSync(diffFile, "");
                res.lines.forEach(function (line) {
                    if (tsourceFileLine !== line.source.start.line) {
                        // fs.appendFileSync(diffFile, "--------ldsourcestart\n");
                        while (tsourceFileLine !== line.source.start.line) {
                            fs_1["default"].appendFileSync(diffFile, sourceFileContentLines[tsourceFileLine] + "\n");
                            tsourceFileLine++;
                        }
                        // fs.appendFileSync(diffFile, "--------ldsourceend\n");
                    }
                    if (tfileLine !== line.file.start.line) {
                        // fs.appendFileSync(diffFile, "--------ldfilestart\n");
                        while (tfileLine !== line.file.start.line) {
                            fs_1["default"].appendFileSync(diffFile, fileContentLines[tfileLine] + "\n");
                            tfileLine++;
                        }
                        // fs.appendFileSync(diffFile, "--------ldfileend\n");
                    }
                    fs_1["default"].appendFileSync(diffFile, "<<<<<<< source --- aaaa --------ldsourcestart\n");
                    // fs.appendFileSync(diffFile, "--------ldsourcestart\n");
                    while (tsourceFileLine <= line.source.end.line) {
                        fs_1["default"].appendFileSync(diffFile, sourceFileContentLines[tsourceFileLine] + "\n");
                        tsourceFileLine++;
                    }
                    // fs.appendFileSync(diffFile, "--------ldsourceend\n");
                    fs_1["default"].appendFileSync(diffFile, "=======\n");
                    // fs.appendFileSync(diffFile, "--------ldfilestart\n");
                    while (tfileLine <= line.file.end.line) {
                        fs_1["default"].appendFileSync(diffFile, fileContentLines[tfileLine] + "\n");
                        tfileLine++;
                    }
                    // fs.appendFileSync(diffFile, "--------ldfileend\n");
                    fs_1["default"].appendFileSync(diffFile, ">>>>>>> file --- aaa\n");
                });
                return [2 /*return*/, res];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1kb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGluay1kb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsOENBQXlCO0FBQ3pCLDBDQUFvQjtBQUNwQiwrQ0FBcUM7QUFFckMsSUFBTSxTQUFTLEdBQUcsaUJBQUssQ0FBQyxTQUFTLENBQUMsb0JBQUksQ0FBQyxDQUFDO0FBRXhDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdkMsSUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTFDLHNCQUFlLFVBQU8sUUFBUSxFQUFFLGNBQWM7Ozs7b0JBQzNCLHFCQUFNLFNBQVMsQ0FBQyx3QkFBc0IsUUFBVSxDQUFDLEVBQUE7O2dCQUE1RCxRQUFRLEdBQUcsU0FBaUQ7Z0JBQy9DLHFCQUFNLFNBQVMsQ0FBQyx3QkFBc0IsY0FBZ0IsQ0FBQyxFQUFBOztnQkFBcEUsVUFBVSxHQUFHLFNBQXVEO2dCQUNwRSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNYLFdBQVcsR0FBRyxlQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuRCxpQkFBaUIsR0FBRyxlQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQVMvRCxRQUFRLEdBQUcsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLEdBQUcsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JB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