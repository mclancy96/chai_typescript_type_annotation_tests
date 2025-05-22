import * as ts from "typescript";
export declare function expectTypeAliasPropertyTypeAnnotation(testFilePath: string, typeAliasName: string, propertyName: string, expectedTypeName: string): void;
/**
 * Finds the type annotation of a property in a type alias.
 * @param node - The root TypeScript AST node
 * @param typeAliasName - The name of the type alias
 * @param propertyName - The property to check
 * @returns The type annotation as a string, or "" if not found
 */
export declare function findTypeAliasPropertyType(node: ts.Node, typeAliasName: string, propertyName: string): string;
