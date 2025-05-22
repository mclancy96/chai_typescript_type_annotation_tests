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
