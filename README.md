# Chai Typescript Type Annotation Tests

## Intro

This package was built with the goal of creating helpers that test type annotation in Typescript in Chai test cases. It was created to test student's code to ensure that they are typing their variables and functions properly.

## Installation

- Be sure to call `npm install chai_typescript_type_annotation_tests` to install the package.
- Once the package is installed, you can then use any of the functions from within Chai test cases.

## Usage

### expectVariableExplicitTypeAnnotation(testFilePath: string, varName: string, typeName: string)

`expectVariableExplicitTypeAnnotation` takes the filepath to the TypeScript file you're testing, the name of the variable, and the expected type name. It asserts that the specified variable is declared with an explicit type annotation matching the expected type.

#### Example Usage

```typescript
describe("Lab 2 — Section 3: Optional Properties", () => {
  expectVariableExplicitTypeAnnotation(myFilePath, "userWithName", "User");
});
```

If the variable is not found or does not have the correct type annotation, the test will fail with a helpful message.

---

### expectFunctionReturnTypeAnnotation(testFilePath: string, functionName: string, returnType: string)

`expectFunctionReturnTypeAnnotation` checks that a function (either a function declaration or an arrow function assigned to a variable) has an explicit return type annotation matching the expected type.

#### Example Usage

```typescript
describe("Lab 3 — Section 1: Function Return Types", () => {
  expectFunctionReturnTypeAnnotation(myFilePath, "getUser", "User");
});
```

If the function does not have the correct return type annotation, the test will fail.

---

### matchFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, expectedParameterTypeArray: string[])

This helper checks that the parameters of a function (by name) have explicit type annotations, and that the types match the expected types in the order provided. This is useful when you want to check parameter types without requiring specific parameter names.

#### Example Usage

```typescript
describe("Lab 4 — Section 2: Function Parameter Types", () => {
  matchFunctionParameterTypeAnnotation(myFilePath, "createUser", [
    "string",
    "number",
    "boolean",
  ]);
});
```

If the function's parameter types do not match the expected array, the test will fail and show the actual types found.

---

### expectFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, paramName: string, paramType: string)

This function asserts that a specific parameter of a function (by name) has an explicit type annotation matching the expected type.

#### Example Usage

```typescript
describe("Lab 5 — Section 1: Specific Parameter Types", () => {
  expectFunctionParameterTypeAnnotation(
    myFilePath,
    "updateUser",
    "userId",
    "string"
  );
});
```

If the parameter is missing or does not have the correct type annotation, the test will fail.

---

## How These Helpers Work

Each helper parses your TypeScript file using the TypeScript compiler API, traverses the Abstract Syntax Tree (AST), and inspects nodes to verify that type annotations are present and correct. This allows you to write tests that enforce explicit type annotations in student or team code.

---

## Contributing

Pull requests and suggestions are welcome! If you find a bug or want to request a new feature, please open an issue.

---

## License

MIT
