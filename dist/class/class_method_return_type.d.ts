import * as ts from "typescript";
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
export declare function expectClassMethodReturnTypeAnnotation(testFilePath: string, className: string, methodName: string, returnType: string): void;
export declare function findClassMethodReturnType(node: ts.Node, className: string, methodName: string): string;
