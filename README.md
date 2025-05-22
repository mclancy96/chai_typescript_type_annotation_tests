# Chai Typescript Type Annotation Tests

## Intro

This package provides helpers for testing TypeScript type annotations in Chai/Mocha test cases. It is designed to help instructors and teams enforce explicit typing in student or team code.

## Installation

- Run `npm install chai_typescript_type_annotation_tests` to install the package.
- Once installed, import and use any of the functions in your Chai/Mocha test cases.

## Usage

---

### Variable Type Annotation

#### `expectVariableExplicitTypeAnnotation(testFilePath: string, varName: string, typeName: string)`

Asserts that a variable is declared with an explicit type annotation matching the expected type.

**Example:**

```typescript
expectVariableExplicitTypeAnnotation(myFilePath, "userWithName", "User");
```

---

### Function Return Type Annotation

#### `expectFunctionReturnTypeAnnotation(testFilePath: string, functionName: string, returnType: string)`

Checks that a function (declaration or arrow function assigned to a variable) has an explicit return type annotation matching the expected type.

**Example:**

```typescript
expectFunctionReturnTypeAnnotation(myFilePath, "getUser", "User");
```

---

### Function Parameter Type Annotation (by parameter name)

#### `expectFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, paramName: string, paramType: string)`

Asserts that a specific parameter of a function (by name) has an explicit type annotation matching the expected type.

**Example:**

```typescript
expectFunctionParameterTypeAnnotation(
  myFilePath,
  "updateUser",
  "userId",
  "string"
);
```

---

### Function Parameter Type Annotation (by parameter order)

#### `matchFunctionParameterTypeAnnotation(testFilePath: string, functionName: string, expectedParameterTypeArray: string[])`

Checks that the parameters of a function have explicit type annotations matching the expected types in order.

**Example:**

```typescript
matchFunctionParameterTypeAnnotation(myFilePath, "createUser", [
  "string",
  "number",
  "boolean",
]);
```

---

### Class Property Type Annotation

#### `expectClassPropertyTypeAnnotation(testFilePath: string, className: string, propertyName: string, typeName: string)`

Asserts that a class property is declared with an explicit type annotation matching the expected type.

**Example:**

```typescript
expectClassPropertyTypeAnnotation(myFilePath, "Person", "name", "string");
```

---

### Class Method Return Type Annotation

#### `expectClassMethodReturnTypeAnnotation(testFilePath: string, className: string, methodName: string, returnType: string)`

Checks that a class method has an explicit return type annotation matching the expected type.

**Example:**

```typescript
expectClassMethodReturnTypeAnnotation(
  myFilePath,
  "User",
  "getFullName",
  "string"
);
```

---

### Class Method Parameter Type Annotation

#### `matchClassMethodParameterTypeAnnotation(testFilePath: string, className: string, methodName: string, expectedParameterTypeArray: string[])`

Checks that the parameters of a class method have explicit type annotations matching the expected types in order.

**Example:**

```typescript
matchClassMethodParameterTypeAnnotation(myFilePath, "User", "setName", [
  "string",
  "string",
]);
```

---

## How These Helpers Work

Each helper parses your TypeScript file using the TypeScript compiler API, traverses the Abstract Syntax Tree (AST), and inspects nodes to verify that type annotations are present and correct. This allows you to write tests that enforce explicit type annotations in student or team code.

---

## Contributing

Pull requests and suggestions are welcome! If you find a bug or want to request a new feature, please open an issue.

---

## License

MIT
