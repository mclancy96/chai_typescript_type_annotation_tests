import { expect } from "chai";
import * as ts from "typescript";
import { findClassMethodParameterTypes } from "../../src/class/match_class_method_parameter_type";

describe("Class Method Parameter Type Annotation", () => {
  const goodCode = `
    class User {
      setName(first: string, last: string): void {
        // ...
      }
      setAge(age: number): void {
        // ...
      }
    }
    class Admin {
      setPermissions(level: string, active: boolean): void {
        // ...
      }
    }
  `;

  const badCode = `
    class Animal {
      setSpecies(species): void {
        // ...
      }
      setAge(age = 5): void {
        // ...
      }
    }
    class Car {
      setMake(make: string, model): void {
        // ...
      }
    }
  `;

  it("should collect correct parameter types for a class method with explicit annotations (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const userNameTypes: string[] = [];
    findClassMethodParameterTypes(sourceFile, "User", "setName", userNameTypes);
    expect(userNameTypes).to.deep.equal(["string", "string"]);

    const userAgeTypes: string[] = [];
    findClassMethodParameterTypes(sourceFile, "User", "setAge", userAgeTypes);
    expect(userAgeTypes).to.deep.equal(["number"]);

    const adminPermTypes: string[] = [];
    findClassMethodParameterTypes(
      sourceFile,
      "Admin",
      "setPermissions",
      adminPermTypes
    );
    expect(adminPermTypes).to.deep.equal(["string", "boolean"]);
  });

  it("should collect actual parameter types, which do not match the expected (negative path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    const animalSpeciesTypes: string[] = [];
    findClassMethodParameterTypes(
      sourceFile,
      "Animal",
      "setSpecies",
      animalSpeciesTypes
    );
    expect(animalSpeciesTypes).to.deep.equal([""]);

    const animalAgeTypes: string[] = [];
    findClassMethodParameterTypes(
      sourceFile,
      "Animal",
      "setAge",
      animalAgeTypes
    );
    expect(animalAgeTypes).to.deep.equal([""]);

    const carMakeTypes: string[] = [];
    findClassMethodParameterTypes(sourceFile, "Car", "setMake", carMakeTypes);
    expect(carMakeTypes).to.deep.equal(["string", ""]);
  });

  it("should return an empty array for a method that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const types: string[] = [];
    findClassMethodParameterTypes(sourceFile, "User", "notAMethod", types);
    expect(types).to.deep.equal([]);
  });

  it("should return an empty array for a class that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    const types: string[] = [];
    findClassMethodParameterTypes(sourceFile, "NotAClass", "setName", types);
    expect(types).to.deep.equal([]);
  });
});
