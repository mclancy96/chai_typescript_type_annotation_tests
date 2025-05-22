import path from "path";
import * as ts from "typescript";
import { readFileSync } from "fs";
import {
  expectVariableExplicitTypeAnnotation,
  findNode,
} from "../../src/global/variable_explicit_type";
import { expect } from "chai";

const exampleTestFile = path.resolve(__dirname, "../../test/example_tests.ts");
const tsCode = readFileSync(exampleTestFile, "utf8");
const sourceFile = ts.createSourceFile(
  exampleTestFile,
  tsCode,
  ts.ScriptTarget.Latest,
  true
);

describe("Test of Variable Type - Happy Path", () => {
  expectVariableExplicitTypeAnnotation(exampleTestFile, "snowball", "string");

  expectVariableExplicitTypeAnnotation(
    exampleTestFile,
    "loadingStatus",
    '"loading" | "success" | "error"'
  );
});

describe("findNode negative cases", () => {
  it("should return the actual type annotation, which does not match the expected", () => {
    // bowsnall is declared as string[] in the file, so let's check for 'string'
    const found = findNode(sourceFile, "bowsnall");
    expect(found).to.not.equal("string");
    expect(found).to.equal("string[]");
  });

  it("should return an empty string for a variable that does not exist", () => {
    const found = findNode(sourceFile, "notARealVar");
    expect(found).to.equal("");
  });
});
