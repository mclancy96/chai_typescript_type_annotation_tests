import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import { expectClassPropertyTypeAnnotation } from "../../src/class/class_property_type";

describe("TypeScript Type Annotation Tests", () => {
  // Create a temporary test file path
  const testFilePath = path.join(__dirname, "temp-test-class.ts");

  beforeEach(() => {
    // Setup: Create a temporary TypeScript file with test classes
    const testCode = `
      class Person {
        name: string;
        age: number;
        private _id: string;

        constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
          this._id = Math.random().toString();
        }

        getFullName(): string {
          return this.name;
        }

        getAge() {
          return this.age;
        }

        setAge(newAge: number): void {
          this.age = newAge;
        }

        getId(): string {
          return this._id;
        }
      }

      class Employee extends Person {
        position: string;

        constructor(name: string, age: number, position: string) {
          super(name, age);
          this.position = position;
        }

        getSalary(): number {
          return 50000;
        }

        getDetails(): { name: string; position: string } {
          return { name: this.name, position: this.position };
        }
      }
    `;

    fs.writeFileSync(testFilePath, testCode);
  });

  afterEach(() => {
    // Cleanup: Remove the temporary test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  describe("expectClassPropertyTypeAnnotation", () => {
    it("should pass when property has the correct type annotation", () => {
      expectClassPropertyTypeAnnotation(
        testFilePath,
        "Person",
        "name",
        "string"
      );
      expectClassPropertyTypeAnnotation(
        testFilePath,
        "Person",
        "age",
        "number"
      );
      expectClassPropertyTypeAnnotation(
        testFilePath,
        "Employee",
        "position",
        "string"
      );
    });

    it("should pass when checking private property type", () => {
      expectClassPropertyTypeAnnotation(
        testFilePath,
        "Person",
        "_id",
        "string"
      );
    });

    it("should fail when property does not exist in the class", () => {
      try {
        expectClassPropertyTypeAnnotation(
          testFilePath,
          "Person",
          "nonExistentProperty",
          "string"
        );
        expect.fail("Test should have failed but passed");
      } catch (error: any) {
        expect(error.message).to.include(
          "must have an explicit type annotation"
        );
      }
    });

    it("should fail when type annotation is incorrect", () => {
      try {
        expectClassPropertyTypeAnnotation(
          testFilePath,
          "Person",
          "age",
          "string"
        );
        expect.fail("Test should have failed but passed");
      } catch (error: any) {
        expect(error.message).to.include(
          "must have an explicit type annotation of 'string'"
        );
      }
    });
  });
});
