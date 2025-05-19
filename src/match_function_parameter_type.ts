import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * This will allow students to name the variables whatever they want without requiring specific names for each variable.
 * Instead of testing a specific variable's type, it takes an array representing the types expected for the parameters
 * of the function in the order that they appear as parameters of the function.
 * @param testFilePath
 * @param functionName
 * @param parameterTypeArray in the format ['string', 'number', 'boolean']
 * @returns
 */
export function matchFunctionParameterTypeAnnotation(
  testFilePath: string,
  functionName: string,
  expectedParameterTypeArray: string[]
) {
  it(`should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    function checkNode(node: ts.Node, accumulator: string[]) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name?.getText() === functionName
      ) {
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
      ts.forEachChild(node, (childNode) => checkNode(childNode, accumulator));
    }
    const paramTypes: string[] = [];
    checkNode(sourceFile, paramTypes);

    expect(
      paramTypes,
      `Expected parameter types [${expectedParameterTypeArray}] but got [${paramTypes}]. Ensure your parameters are typed correctly or at all`
    ).to.have.members(expectedParameterTypeArray);
  });
}
