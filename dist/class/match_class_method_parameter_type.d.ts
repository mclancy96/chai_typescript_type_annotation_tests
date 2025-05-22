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
export declare function matchClassMethodParameterTypeAnnotation(testFilePath: string, className: string, methodName: string, expectedParameterTypeArray: string[]): void;
/**
 * Recursively finds the parameter types of a class method and pushes them to the accumulator.
 */
export declare function findClassMethodParameterTypes(node: ts.Node, className: string, methodName: string, accumulator: string[]): void;
