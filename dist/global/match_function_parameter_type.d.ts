import * as ts from "typescript";
/**
 * Tests if a function has parameters with specific type annotations.
 * This function allows flexibility in variable naming while ensuring correct type annotations.
 * It works with both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param functionName - The name of the function whose parameters to check
 * @param expectedParameterTypeArray - An array of expected parameter types as strings (e.g., ['string', 'number', 'boolean'])
 * @returns A Mocha test case that verifies parameter type annotations
 *
 * @example
 * // Test if myFunction has string and number parameters
 * matchFunctionParameterTypeAnnotation('path/to/file.ts', 'myFunction', ['string', 'number']);
 */
export declare function matchFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, expectedParameterTypeArray: string[]): void;
export declare function findFunctionParameterTypes(node: ts.Node, functionName: string, accumulator: string[], expectedParameterTypeArray: string[]): void;
