import { expect } from "chai";
import * as ts from "typescript";
import { findNode } from "../../src/global/function_return_type";

describe("findNode - Function Return Type Annotation", () => {
  const goodCode = `
    function swim(): string {
      return "done";
    }
    const greet = (name: string): number => {
      return name.length;
    };
  `;
  const badCode = `
    function swimmer(): number {
      return 42;
    }
    const shout = (name: string): string => {
      return name.toUpperCase();
    };
    function noType() {
      return "no type annotation";
    }
  `;

  it("should find the correct return type annotation for a function (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const foundSwim = findNode(sourceFile, "swim");
    expect(foundSwim).to.equal("string");

    const foundGreet = findNode(sourceFile, "greet");
    expect(foundGreet).to.equal("number");
  });

  it("should return the actual return type annotation, which does not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const foundSwimmer = findNode(sourceFile, "swimmer");
    expect(foundSwimmer).to.not.equal("string");
    expect(foundSwimmer).to.equal("number");

    const foundShout = findNode(sourceFile, "shout");
    expect(foundShout).to.equal("string");
  });

  it("should return an empty string for a function with no explicit return type annotation", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const foundNoType = findNode(sourceFile, "noType");
    expect(foundNoType).to.equal("");
  });

  it("should return an empty string for a function that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findNode(sourceFile, "notARealFunction");
    expect(found).to.equal("");
  });
});
