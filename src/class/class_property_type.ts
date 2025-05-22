import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

/**
 * Tests if a class in a TypeScript file has a property with the expected type annotation.
 *
 * This function creates a test that verifies whether a class has a property with the given name
 * that is explicitly annotated with the specified type in the provided TypeScript file.
 * It uses the TypeScript compiler API to parse and analyze the code.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param className - The name of the class containing the property
 * @param propertyName - The name of the property to check
 * @param typeName - The expected type annotation as a string (exactly as it appears in code)
 *
 * @example
 * // Check if the 'Person' class has a 'name' property with type 'string'
 * expectClassPropertyTypeAnnotation('./src/models.ts', 'Person', 'name', 'string');
 */
export function expectClassPropertyTypeAnnotation(
  testFilePath: string,
  className: string,
  propertyName: string,
  typeName: string
) {
  it(`should declare '${propertyName}' property in class '${className}' with an explicit type annotation of '${typeName}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const found = findClassProperty(sourceFile, className, propertyName);

    expect(
      found,
      `'${propertyName}' property in class '${className}' must have an explicit type annotation of '${typeName}' but found '${found}'`
    ).to.equal(typeName);
  });
}

function findClassProperty(
  node: ts.Node,
  className: string,
  propertyName: string
): string {
  if (
    ts.isClassDeclaration(node) &&
    node.name &&
    node.name.getText() === className
  ) {
    for (const member of node.members) {
      if (
        ts.isPropertyDeclaration(member) &&
        member.name &&
        member.name.getText() === propertyName &&
        member.type
      ) {
        return member.type.getText();
      }
    }
  }
  return (
    ts.forEachChild(node, (childNode) =>
      findClassProperty(childNode, className, propertyName)
    ) || ""
  );
}
