import { expect } from "chai";
import * as ts from "typescript";
import { findNodes } from "../../src/global/match_function_parameter_type";

describe("Match Function Parameter Type Annotation", () => {
  const goodCode = `
    const greet = (name: string, greeting: string = "Hello"): string =>
      \`\${greeting}, \${name}.\`;
    function add(a: number, b: number): number {
      return a + b;
    }
  `;
  const badCode = `
    const shout = (name: number, greeting: string = "Hello"): string =>
      \`\${greeting}, \${name}!\`;
    function wave(person, enthusiasm = 1): string {
      return \`\${person} waves with enthusiasm level \${enthusiasm}\`;
    }
  `;

  it("should collect correct parameter types for a function with explicit annotations (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const paramTypes: string[] = [];
    findNodes(sourceFile, "greet", paramTypes, ["string", "string"]);
    expect(paramTypes).to.deep.equal(["string", "string"]);

    const addParamTypes: string[] = [];
    findNodes(sourceFile, "add", addParamTypes, ["number", "number"]);
    expect(addParamTypes).to.deep.equal(["number", "number"]);
  });

  it("should collect actual parameter types, which do not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const paramTypes: string[] = [];
    findNodes(sourceFile, "shout", paramTypes, ["string", "string"]);
    expect(paramTypes).to.deep.equal(["string"]); // No match for "string", "string"

    const paramTypesNumber: string[] = [];
    findNodes(sourceFile, "shout", paramTypesNumber, ["number", "string"]);
    expect(paramTypesNumber).to.deep.equal(["number", "string"]);
  });

  it("should return empty strings for parameters with no explicit type annotation", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const paramTypes: string[] = [];
    findNodes(sourceFile, "wave", paramTypes, ["", ""]);
    expect(paramTypes).to.deep.equal([]);
  });

  it("should return an empty array for a function that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const paramTypes: string[] = [];
    findNodes(sourceFile, "notARealFunction", paramTypes, ["string"]);
    expect(paramTypes).to.deep.equal([]);
  });
});
