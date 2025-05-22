import { expect } from "chai";
import * as ts from "typescript";
import { findClassPropertyType } from "../../src/class/class_property_type";

describe("Class Property Type Annotation", () => {
  const goodCode = `
    class Person {
      name: string;
      age: number;
      private _id: string;

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this._id = Math.random().toString();
      }
    }

    class Employee extends Person {
      position: string;

      constructor(name: string, age: number, position: string) {
        super(name, age);
        this.position = position;
      }
    }
  `;

  const badCode = `
    class Animal {
      species;
      age = 5;
    }
    class Car {
      make: string;
      model;
    }
  `;

  it("should find the correct type annotation for a class property (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassPropertyType(sourceFile, "Person", "name")).to.equal(
      "string"
    );
    expect(findClassPropertyType(sourceFile, "Person", "age")).to.equal(
      "number"
    );
    expect(findClassPropertyType(sourceFile, "Person", "_id")).to.equal(
      "string"
    );
    expect(findClassPropertyType(sourceFile, "Employee", "position")).to.equal(
      "string"
    );
  });

  it("should return an empty string for a property with no explicit type annotation", () => {
    const sourceFile = ts.createSourceFile(
      "inline_bad.ts",
      badCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassPropertyType(sourceFile, "Animal", "species")).to.equal("");
    expect(findClassPropertyType(sourceFile, "Animal", "age")).to.equal("");
    expect(findClassPropertyType(sourceFile, "Car", "model")).to.equal("");
  });

  it("should return an empty string for a property that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassPropertyType(sourceFile, "Person", "notAProp")).to.equal(
      ""
    );
    expect(findClassPropertyType(sourceFile, "Employee", "salary")).to.equal(
      ""
    );
  });

  it("should return an empty string for a class that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_good.ts",
      goodCode,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findClassPropertyType(sourceFile, "NotAClass", "name")).to.equal("");
  });
});
