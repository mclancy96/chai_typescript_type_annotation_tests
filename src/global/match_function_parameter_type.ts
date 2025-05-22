import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Tests if a function has parameters with specific type annotations.
 * This function allows flexibility in variable naming while ensuring correct type annotations.
 * It works with both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param functionName - The name of the function whose parameters to check
 * @param expectedParameterTypeArray - An array of expected parameter types as strings (e.g., ['string', 'number', 'boolean'])
 * @returns A Mocha test case that verifies parameter type annotations
 *
 * @example
 * // Test if myFunction has string and number parameters
 * matchFunctionParameterTypeAnnotation('path/to/file.ts', 'myFunction', ['string', 'number']);
 */
export function matchFunctionParameterTypeAnnotation(
  testFilePath: string,
  functionName: string,
  expectedParameterTypeArray: string[]
) {
  it(`${functionName} should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const paramTypes: string[] = [];
    findNodes(sourceFile, functionName, paramTypes, expectedParameterTypeArray);

    expect(
      paramTypes,
      `Expected ${functionName} to have parameter types [${expectedParameterTypeArray}] but got [${paramTypes}]. Ensure your parameters are defined and typed accordingly.`
    ).to.have.members(expectedParameterTypeArray);
  });
}

function findNodes(
  node: ts.Node,
  functionName: string,
  accumulator: string[],
  expectedParameterTypeArray: string[]
) {
  if (ts.isFunctionDeclaration(node) && node.name?.getText() === functionName) {
    // Check regular function declarations
    for (const param of node.parameters) {
      if (
        param.type &&
        expectedParameterTypeArray.includes(param.type.getText())
      ) {
        accumulator.push(param.type.getText());
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
          param.type &&
          expectedParameterTypeArray.includes(param.type.getText())
        ) {
          accumulator.push(param.type.getText());
        }
      }
    }
  }
  ts.forEachChild(node, (childNode) =>
    findNodes(childNode, functionName, accumulator, expectedParameterTypeArray)
  );
}
