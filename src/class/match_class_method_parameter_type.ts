import { expect } from "chai";
import * as ts from "typescript";

/**
 * Tests if a class method has parameters with specific type annotations.
 * Works for both public and private methods.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param className - The name of the class containing the method
 * @param methodName - The name of the method whose parameters to check
 * @param expectedParameterTypeArray - An array of expected parameter types as strings (e.g., ['string', 'number'])
 * @returns A Mocha test case that verifies parameter type annotations
 *
 * @example
 * // Test if User.getFullName has parameters of type string and number
 * matchClassMethodParameterTypeAnnotation('path/to/file.ts', 'User', 'getFullName', ['string', 'number']);
 */
export function matchClassMethodParameterTypeAnnotation(
  testFilePath: string,
  className: string,
  methodName: string,
  expectedParameterTypeArray: string[]
) {
  it(`${className}.${methodName} should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
    const tsCode = require("fs").readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const paramTypes: string[] = [];
    findClassMethodParameterTypes(
      sourceFile,
      className,
      methodName,
      paramTypes
    );

    expect(
      paramTypes,
      `Expected ${className}.${methodName} to have parameter types [${expectedParameterTypeArray}] but got [${paramTypes}].`
    ).to.deep.equal(expectedParameterTypeArray);
  });
}

/**
 * Recursively finds the parameter types of a class method and pushes them to the accumulator.
 */
export function findClassMethodParameterTypes(
  node: ts.Node,
  className: string,
  methodName: string,
  accumulator: string[]
) {
  if (ts.isClassDeclaration(node) && node.name?.getText() === className) {
    for (const member of node.members) {
      if (
        ts.isMethodDeclaration(member) &&
        member.name.getText() === methodName
      ) {
        for (const param of member.parameters) {
          accumulator.push(param.type?.getText() || "");
        }
      }
    }
  }
  ts.forEachChild(node, (childNode) =>
    findClassMethodParameterTypes(childNode, className, methodName, accumulator)
  );
}
