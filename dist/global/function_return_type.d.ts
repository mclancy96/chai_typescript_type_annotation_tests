import * as ts from "typescript";
/**
 * Tests if a function in a TypeScript file has an explicit return type annotation.
 * This function creates a test case that verifies whether a specified function has
 * the expected return type annotation.
 *
 * @param testFilePath - The path to the TypeScript file containing the function to test
 * @param functionName - The name of the function to check for return type annotation
 * @param returnType - The expected return type that should be explicitly declared
 *
 * @example
 * ```
 * expectFunctionReturnTypeAnnotation(
 *   './src/utils.ts',
 *   'calculateTotal',
 *   'number'
 * );
 * ```
 *
 * @remarks
 * This function can check both function declarations and arrow functions assigned to variables.
 * For arrow functions, it examines the parent node to find the variable name.
 */
export declare function expectFunctionReturnTypeAnnotation(testFilePath: string, functionName: string, returnType: string): void;
export declare function findFunctionReturnType(node: ts.Node, functionName: string): string;
