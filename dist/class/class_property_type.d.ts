import * as ts from "typescript";
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
export declare function expectClassPropertyTypeAnnotation(testFilePath: string, className: string, propertyName: string, typeName: string): void;
export declare function findClassPropertyType(node: ts.Node, className: string, propertyName: string): string;
