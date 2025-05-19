export declare function expectVariableExplicitTypeAnnotation(testFilePath: string, varName: string, typeName: string): void;
export declare function expectFunctionReturnTypeAnnotation(testFilePath: string, functionName: string, returnType: string): void;
/**
 * This will allow students to name the variables whatever they want without requiring specific names for each variable.
 * Instead of testing a specific variable's type, it takes an array representing the types expected for the parameters
 * of the function in the order that they appear as parameters of the function.
 * @param testFilePath
 * @param functionName
 * @param parameterTypeArray in the format ['string', 'number', 'boolean']
 * @returns
 */
export declare function matchFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, expectedParameterTypeArray: string[]): void;
export declare function expectFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, paramName: string, paramType: string): void;
