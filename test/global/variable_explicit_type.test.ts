import * as ts from "typescript";
import { findNode } from "../../src/global/variable_explicit_type";
import { expect } from "chai";

describe("Variable Explicit Type Annotation", () => {
  const goodCode = `
    const snowball: string = "5";
    let loadingStatus: "loading" | "success" | "error" = "loading";
  `;
  const badCode = `
    const bowsnall: string[] = "5";
    const noType = 42;
  `;

  it("should find the correct type annotation for a variable (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found1 = findNode(sourceFile, "snowball");
    expect(found1).to.equal("string");

    const found2 = findNode(sourceFile, "loadingStatus");
    expect(found2).to.equal('"loading" | "success" | "error"');
  });

  it("should return the actual type annotation, which does not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findNode(sourceFile, "bowsnall");
    expect(found).to.not.equal("string");
    expect(found).to.equal("string[]");
  });

  it("should return an empty string for a variable with no explicit type annotation (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findNode(sourceFile, "noType");
    expect(found).to.equal("");
  });

  it("should return an empty string for a variable that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const found = findNode(sourceFile, "notARealVar");
    expect(found).to.equal("");
  });
});
