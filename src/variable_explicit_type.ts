
import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Tests if a variable in a TypeScript file has an explicit type annotation of the expected type.
 *
 * This function creates a test that verifies whether a variable with the given name
 * has been explicitly annotated with the specified type in the provided TypeScript file.
 * It uses the TypeScript compiler API to parse and analyze the code.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param varName - The name of the variable to check for type annotation
 * @param typeName - The expected type annotation as a string (exactly as it appears in code)
 *
 * @example
 * // Check if the 'user' variable has an explicit 'Person' type annotation
 * expectVariableExplicitTypeAnnotation('./src/users.ts', 'user', 'Person');
 */
export function expectVariableExplicitTypeAnnotation(
  testFilePath: string,
  varName: string,
  typeName: string
) {
  it(`should declare '${varName}' variable with an explicit type annotation of '${typeName}'`, () => {
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
        ts.isVariableDeclaration(node) &&
        node.name.getText() === varName &&
        node.type &&
        node.type.getText() === typeName
      ) {
        found = true;
      }
      ts.forEachChild(node, checkNode);
    }

    checkNode(sourceFile);

    expect(
      found,
      `${varName} variable must have an explicit type annotation of '${typeName}'`
    ).to.be.true;
  });
}

