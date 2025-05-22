import * as ts from "typescript";
/**
 * Creates a test that checks if a function parameter has the expected type annotation.
 *
 * This function generates a Mocha test that verifies whether a specific parameter
 * in a function has been properly annotated with the specified type. It supports
 * both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - Path to the TypeScript file containing the function to test
 * @param functionName - Name of the function to check
 * @param paramName - Name of the parameter to check
 * @param paramType - Expected type annotation for the parameter (exact string match)
 *
 * @example
 * ```typescript
 * // Check if the 'name' parameter of 'greet' function has a 'string' type annotation
 * expectFunctionParameterTypeAnnotation(
 *   './src/greeting.ts',
 *   'greet',
 *   'name',
 *   'string'
 * );
 * ```
 */
export declare function expectFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, paramName: string, paramType: string): void;
export declare function findFunctionParameterType(node: ts.Node, paramName: string, functionName: string): string;
