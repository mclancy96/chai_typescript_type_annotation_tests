import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

export function expectVariableExplicitTypeAnnotation(
  testFilePath: string,
  typeAliasName: string,
  propertyName: string,
  expectedTypeName: string
) {
  it(`should declare '${typeAliasName}' type alias with a ${propertyName} property of type annotation '${expectedTypeName}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    const found = findTypeAliasPropertyType(
      sourceFile,
      typeAliasName,
      propertyName
    );

    return expect(
      found,
      `'${typeAliasName}' type alias should have a '${propertyName}' property of type annotation '${expectedTypeName}' but found '${found}'`
    ).to.equal(expectedTypeName);
  });
}

/**
 * Finds the type annotation of a property in a type alias.
 * @param node - The root TypeScript AST node
 * @param typeAliasName - The name of the type alias
 * @param propertyName - The property to check
 * @returns The type annotation as a string, or "" if not found
 */
export function findTypeAliasPropertyType(
  node: ts.Node,
  typeAliasName: string,
  propertyName: string
): string {
  if (
    ts.isTypeAliasDeclaration(node) &&
    node.name.getText() === typeAliasName &&
    ts.isTypeLiteralNode(node.type)
  ) {
    for (const member of node.type.members) {
      if (
        ts.isPropertySignature(member) &&
        member.name.getText() === propertyName &&
        member.type
      ) {
        return member.type.getText();
      }
    }
  }
  let found = "";
  ts.forEachChild(node, (child) => {
    if (!found) {
      found = findTypeAliasPropertyType(child, typeAliasName, propertyName);
    }
  });
  return found;
}
