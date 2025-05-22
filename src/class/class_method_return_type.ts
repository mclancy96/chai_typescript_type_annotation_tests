import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Tests if a method in a class in a TypeScript file has an explicit return type annotation.
 * This function creates a test case that verifies whether a specified class method has
 * the expected return type annotation.
 *
 * @param testFilePath - The path to the TypeScript file containing the class to test
 * @param className - The name of the class containing the method
 * @param methodName - The name of the method to check for return type annotation
 * @param returnType - The expected return type that should be explicitly declared
 *
 * @example
 * ```
 * expectClassMethodReturnTypeAnnotation(
 *   './src/models.ts',
 *   'User',
 *   'getFullName',
 *   'string'
 * );
 * ```
 *
 * @remarks
 * This function can check class method declarations for their return type annotations.
 */
export function expectClassMethodReturnTypeAnnotation(
  testFilePath: string,
  className: string,
  methodName: string,
  returnType: string
) {
  it(`should declare method '${methodName}' in class '${className}' with an explicit return type annotation of '${returnType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const found = findClassMethodReturnType(sourceFile, className, methodName);
    expect(
      found,
      `Method '${methodName}' in class '${className}' must have an explicit return type annotation of '${returnType}' but found '${found}'`
    ).to.deep.equal(returnType);
  });
}

export function findClassMethodReturnType(
  node: ts.Node,
  className: string,
  methodName: string
): string {
  if (
    ts.isClassDeclaration(node) &&
    node.name &&
    node.name.getText() === className
  ) {
    for (const member of node.members) {
      if (
        ts.isMethodDeclaration(member) &&
        member.name &&
        member.name.getText() === methodName &&
        member.type
      ) {
        return member.type.getText();
      }
    }
  }
  return (
    ts.forEachChild(node, (childNode) =>
      findClassMethodReturnType(childNode, className, methodName)
    ) || ""
  );
}
