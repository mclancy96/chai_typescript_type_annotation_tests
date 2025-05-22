import { expect } from "chai";
import * as ts from "typescript";
import { findClassMethodReturnType } from "../../src/class/class_method_return_type";

describe("Class Method Return Type Annotation", () => {
  const goodCode = `
    class User {
      getFullName(): string {
        return "John Doe";
      }
      getId(): number {
        return 42;
      }
    }
    class Admin {
      isAdmin(): boolean {
        return true;
      }
    }
  `;

  const badCode = `
    class Animal {
      speak() {
        return "woof";
      }
      getAge(): number {
        return 5;
      }
    }
    class Car {
      start() {
        return true;
      }
    }
  `;

  it("should find the correct return type annotation for a class method (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(
      findClassMethodReturnType(sourceFile, "User", "getFullName")
    ).to.equal("string");
    expect(findClassMethodReturnType(sourceFile, "User", "getId")).to.equal(
      "number"
    );
    expect(findClassMethodReturnType(sourceFile, "Admin", "isAdmin")).to.equal(
      "boolean"
    );
  });

  it("should return an empty string for a method with no explicit return type annotation", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassMethodReturnType(sourceFile, "Animal", "speak")).to.equal(
      ""
    );
    expect(findClassMethodReturnType(sourceFile, "Car", "start")).to.equal("");
  });

  it("should return the actual return type annotation, which does not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassMethodReturnType(sourceFile, "Animal", "getAge")).to.equal(
      "number"
    );
    expect(
      findClassMethodReturnType(sourceFile, "Animal", "getAge")
    ).to.not.equal("string");
  });

  it("should return an empty string for a method that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(
      findClassMethodReturnType(sourceFile, "User", "notAMethod")
    ).to.equal("");
    expect(
      findClassMethodReturnType(sourceFile, "NotAClass", "getFullName")
    ).to.equal("");
  });
});
