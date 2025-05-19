import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

export function expectFunctionParameterTypeAnnotation(
  testFilePath: string,
  functionName: string,
  paramName: string,
  paramType: string
) {
  it(`should declare parameter '${paramName}' of function '${functionName}' with an explicit type annotation of '${paramType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let found = false;

    function checkNode(node: ts.Node) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name?.getText() === functionName
      ) {
        // Check regular function declarations
        for (const param of node.parameters) {
          if (
            param.name.getText() === paramName &&
            param.type &&
            param.type.getText() === paramType
          ) {
            found = true;
          }
        }
      } else if (
        ts.isArrowFunction(node) &&
        ts.isVariableDeclaration(node.parent)
      ) {
        // Check arrow functions assigned to variables
        if (node.parent.name.getText() === functionName) {
          for (const param of node.parameters) {
            if (
              param.name.getText() === paramName &&
              param.type &&
              param.type.getText() === paramType
            ) {
              found = true;
            }
          }
        }
      }
      ts.forEachChild(node, checkNode);
    }

    checkNode(sourceFile);

    expect(
      found,
      `Parameter '${paramName}' of function '${functionName}' must have an explicit type annotation of '${paramType}'`
    ).to.be.true;
  });
}
