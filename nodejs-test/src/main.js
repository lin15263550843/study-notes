// console.log("__dirname", __dirname);
// console.log("process.pwd", process.cwd());

// const jstransform = require("jstransform");

// function arrowFunctionToFunctionExpressionVisitor(traverse, node) {
//   if (node.type === "ArrowFunctionExpression") {
//     const params = node.params.map((param) => param.name);
//     const body = node.body;
//     const newFunctionNode = {
//       type: "FunctionExpression",
//       params: params,
//       body: body,
//       async: false,
//       generator: false,
//       expression: body.type !== "BlockStatement",
//     };
//     return newFunctionNode;
//   }
// }
// arrowFunctionToFunctionExpressionVisitor.test = (node, path, state) => {
//   // console.log("node, path, state---", path);
// };
// function arrowFunctionToFunctionExpression(code) {
//   const visitorList = [arrowFunctionToFunctionExpressionVisitor];
//   const newAst = jstransform.transform(visitorList, code);
//   console.log("newAst", newAst);
//   // return jstransform.generate(newAst).code;
// }

// const code = "const add = (a, b) => a + b;";
// console.log(arrowFunctionToFunctionExpression(code)); // 输出： const add = function(a, b) { return a + b;};

// var fs = require("fs"),
esprima = require("esprima");

function analyzeCode(code) {
  // 1
  return esprima.parse(code);
}
// // 2
// if (process.argv.length < 3) {
//   console.log("Usage: index.js file.js");
//   process.exit(1);
// }

// 3
// var filename = process.argv[2];
// console.log("Reading " + filename);
// var code = fs.readFileSync(filename);

// analyzeCode(code);

const code = "const add = (a, b) => a + b;";
const ast = analyzeCode(code);
console.log(JSON.stringify(ast, null, 4));
console.log("Done");
