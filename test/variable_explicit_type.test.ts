import { join } from "path";
import { expectVariableExplicitTypeAnnotation } from "../src/variable_explicit_type";

describe("Test of Variable Type - Happy Path", () => {
  expectVariableExplicitTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "snowball",
    "string"
  );
});

describe("Test of Variable Type - Negative Path", () => {
  expectVariableExplicitTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "bowsnall",
    "string"
  );
});
