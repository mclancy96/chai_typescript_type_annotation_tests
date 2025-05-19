import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

export function expectFunctionReturnTypeAnnotation(
  testFilePath: string,
  functionName: string,
  returnType: string
) {
  function checkNode(node: ts.Node): boolean {
    if (ts.isFunctionDeclaration(node)) {
      // Handle function declarations as before
      return (
        (node.name &&
          node.name.getText() === functionName &&
          node.type &&
          node.type.getText() === returnType) ||
        false
      );
    } else if (ts.isArrowFunction(node)) {
      // For arrow functions, check the parent node
      if (ts.isVariableDeclaration(node.parent)) {
        const arrowFunctionName = node.parent.name.getText();
        return (
          (arrowFunctionName === functionName &&
            node.type &&
            node.type.getText() === returnType) ||
          false
        );
      }
    }
    return ts.forEachChild(node, checkNode) || false;
  }
  it(`should declare function '${functionName}' with an explicit return type annotation of '${returnType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let found = checkNode(sourceFile);
    expect(
      found,
      `Function '${functionName}' must have an explicit return type annotation of '${returnType}'`
    ).to.be.true;
  });
}
