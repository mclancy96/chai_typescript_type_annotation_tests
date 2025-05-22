import { expect } from "chai";
import * as ts from "typescript";
import { findFunctionParameterNode } from "../../src/global/function_parameter_type";

describe("Function Parameter Type Annotation", () => {
  const goodCode = `
    function greet(name: string, greeting: string = "Hello"): string {
      return \`\${greeting}, \${name}.\`;
    }
  `;
  const badCode = `
    function shout(name: number, greeting: string = "Hello"): string {
      return \`\${greeting}, \${name}!\`;
    }
    function wave(person, enthusiasm = 1): string {
      return \`\${person} waves with enthusiasm level \${enthusiasm}\`;
    }
  `;

  it("should find the correct type annotation for a parameter (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findFunctionParameterNode(sourceFile, "name", "greet");
    expect(found).to.equal("string");
  });

  it("should return the actual type annotation, which does not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findFunctionParameterNode(sourceFile, "name", "shout");
    expect(found).to.not.equal("string");
    expect(found).to.equal("number");
  });

  it("should return an empty string for a parameter with no explicit type annotation (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findFunctionParameterNode(sourceFile, "person", "wave");
    expect(found).to.equal("");
  });

  it("should return an empty string for a parameter that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findFunctionParameterNode(
      sourceFile,
      "notARealParam",
      "greet"
    );
    expect(found).to.equal("");
  });
});
