import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Tests if a function in a TypeScript file has an explicit return type annotation.
 * This function creates a test case that verifies whether a specified function has
 * the expected return type annotation.
 *
 * @param testFilePath - The path to the TypeScript file containing the function to test
 * @param functionName - The name of the function to check for return type annotation
 * @param returnType - The expected return type that should be explicitly declared
 *
 * @example
 * ```
 * expectFunctionReturnTypeAnnotation(
 *   './src/utils.ts',
 *   'calculateTotal',
 *   'number'
 * );
 * ```
 *
 * @remarks
 * This function can check both function declarations and arrow functions assigned to variables.
 * For arrow functions, it examines the parent node to find the variable name.
 */
export function expectFunctionReturnTypeAnnotation(
  testFilePath: string,
  functionName: string,
  returnType: string
) {
  it(`should declare function '${functionName}' with an explicit return type annotation of '${returnType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const found = findNode(sourceFile, functionName);
    expect(
      found,
      `Function '${functionName}' must have an explicit return type annotation of '${returnType}' but found '${found}'`
    ).to.deep.equal(returnType);
  });
}
function findNode(node: ts.Node, functionName: string): string {
  if (ts.isFunctionDeclaration(node)) {
    // Handle function declarations as before
    if (node.name && node.name.getText() === functionName && node.type) {
      return node.type.getText();
    }
  } else if (ts.isArrowFunction(node)) {
    // For arrow functions, check the parent node
    if (ts.isVariableDeclaration(node.parent)) {
      const arrowFunctionName = node.parent.name.getText();
      if (arrowFunctionName === functionName && node.type) {
        return node.type.getText();
      }
    }
  }
  return (
    ts.forEachChild(node, (childNode) => findNode(childNode, functionName)) ||
    ""
  );
}
