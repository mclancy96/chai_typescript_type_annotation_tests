import { expect } from "chai";
import * as ts from "typescript";
import { readFileSync } from "fs";

export function expectVariableExplicitTypeAnnotation(
  testFilePath: string,
  varName: string,
  typeName: string
) {
  it(`should declare '${varName}' variable with an explicit type annotation of '${typeName}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let found = false;

    function checkNode(node: ts.Node) {
      if (
        ts.isVariableDeclaration(node) &&
        node.name.getText() === varName &&
        node.type &&
        node.type.getText() === typeName
      ) {
        found = true;
      }
      ts.forEachChild(node, checkNode);
    }

    checkNode(sourceFile);

    expect(
      found,
      `${varName} variable must have an explicit type annotation of '${typeName}'`
    ).to.be.true;
  });
}

export function expectFunctionReturnTypeAnnotation(
  testFilePath: string,
  functionName: string,
  returnType: string
) {
  function checkNode(node: ts.Node): boolean {
    if (ts.isFunctionDeclaration(node)) {
      // Handle function declarations as before
      return (
        (node.name &&
          node.name.getText() === functionName &&
          node.type &&
          node.type.getText() === returnType) ||
        false
      );
    } else if (ts.isArrowFunction(node)) {
      // For arrow functions, check the parent node
      if (ts.isVariableDeclaration(node.parent)) {
        const arrowFunctionName = node.parent.name.getText();
        return (
          (arrowFunctionName === functionName &&
            node.type &&
            node.type.getText() === returnType) ||
          false
        );
      }
    }
    return ts.forEachChild(node, checkNode) || false;
  }
  it(`should declare function '${functionName}' with an explicit return type annotation of '${returnType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let found = checkNode(sourceFile);
    expect(
      found,
      `Function '${functionName}' must have an explicit return type annotation of '${returnType}'`
    ).to.be.true;
  });
}

/**
 * This will allow students to name the variables whatever they want without requiring specific names for each variable.
 * Instead of testing a specific variable's type, it takes an array representing the types expected for the parameters
 * of the function in the order that they appear as parameters of the function.
 * @param testFilePath
 * @param functionName
 * @param parameterTypeArray in the format ['string', 'number', 'boolean']
 * @returns
 */
export function matchFunctionParameterTypeAnnotation(
  testFilePath: string,
  functionName: string,
  expectedParameterTypeArray: string[]
) {
  it(`should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    function checkNode(node: ts.Node, accumulator: string[]) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name?.getText() === functionName
      ) {
        // Check regular function declarations
        for (const param of node.parameters) {
          if (
            param.type &&
            expectedParameterTypeArray.includes(param.type.getText())
          ) {
            accumulator.push(param.type.getText());
          }
        }
      } else if (
        ts.isArrowFunction(node) &&
        ts.isVariableDeclaration(node.parent)
      ) {
        // Check arrow functions assigned to variables
        if (node.parent.name.getText() === functionName) {
          for (const param of node.parameters) {
            if (
              param.type &&
              expectedParameterTypeArray.includes(param.type.getText())
            ) {
              accumulator.push(param.type.getText());
            }
          }
        }
      }
      ts.forEachChild(node, (childNode) => checkNode(childNode, accumulator));
    }
    const paramTypes: string[] = [];
    checkNode(sourceFile, paramTypes);

    expect(
      paramTypes,
      `Expected parameter types [${expectedParameterTypeArray}] but got [${paramTypes}]. Ensure your parameters are typed correctly or at all`
    ).to.have.members(expectedParameterTypeArray);
  });
}

export function expectFunctionParameterTypeAnnotation(
  testFilePath: string,
  functionName: string,
  paramName: string,
  paramType: string
) {
  it(`should declare parameter '${paramName}' of function '${functionName}' with an explicit type annotation of '${paramType}'`, () => {
    const tsCode = readFileSync(testFilePath, "utf8");
    const sourceFile = ts.createSourceFile(
      testFilePath,
      tsCode,
      ts.ScriptTarget.Latest,
      true
    );

    let found = false;

    function checkNode(node: ts.Node) {
      if (
        ts.isFunctionDeclaration(node) &&
        node.name?.getText() === functionName
      ) {
        // Check regular function declarations
        for (const param of node.parameters) {
          if (
            param.name.getText() === paramName &&
            param.type &&
            param.type.getText() === paramType
          ) {
            found = true;
          }
        }
      } else if (
        ts.isArrowFunction(node) &&
        ts.isVariableDeclaration(node.parent)
      ) {
        // Check arrow functions assigned to variables
        if (node.parent.name.getText() === functionName) {
          for (const param of node.parameters) {
            if (
              param.name.getText() === paramName &&
              param.type &&
              param.type.getText() === paramType
            ) {
              found = true;
            }
          }
        }
      }
      ts.forEachChild(node, checkNode);
    }

    checkNode(sourceFile);

    expect(
      found,
      `Parameter '${paramName}' of function '${functionName}' must have an explicit type annotation of '${paramType}'`
    ).to.be.true;
  });
}
