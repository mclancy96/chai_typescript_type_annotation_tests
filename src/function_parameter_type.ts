import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Creates a test that checks if a function parameter has the expected type annotation.
 *
 * This function generates a Mocha test that verifies whether a specific parameter
 * in a function has been properly annotated with the specified type. It supports
 * both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - Path to the TypeScript file containing the function to test
 * @param functionName - Name of the function to check
 * @param paramName - Name of the parameter to check
 * @param paramType - Expected type annotation for the parameter (exact string match)
 *
 * @example
 * ```typescript
 * // Check if the 'name' parameter of 'greet' function has a 'string' type annotation
 * expectFunctionParameterTypeAnnotation(
 *   './src/greeting.ts',
 *   'greet',
 *   'name',
 *   'string'
 * );
 * ```
 */
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

    const found = checkNode(sourceFile, paramName, functionName);

    expect(
      found,
      `Parameter '${paramName}' of function '${functionName}' must have an explicit type annotation of '${paramType}' but found '${found}'`
    ).to.equal(paramType);
  });
}

function checkNode(
  node: ts.Node,
  paramName: string,
  functionName: string
): string {
  if (ts.isFunctionDeclaration(node) && node.name?.getText() === functionName) {
    // Check regular function declarations
    for (const param of node.parameters) {
      if (param.name.getText() === paramName && param.type) {
        return param.type.getText() || "";
      }
    }
  } else if (
    ts.isArrowFunction(node) &&
    ts.isVariableDeclaration(node.parent)
  ) {
    // Check arrow functions assigned to variables
    if (node.parent.name.getText() === functionName) {
      for (const param of node.parameters) {
        if (param.name.getText() === paramName && param.type) {
          return param.type.getText() || "";
        }
      }
    }
  }
  return (
    ts.forEachChild(node, (childNode) =>
      checkNode(childNode, paramName, functionName)
    ) || ""
  );
}
