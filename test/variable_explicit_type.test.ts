import { join } from "path";
import { expectVariableExplicitTypeAnnotation } from "../src/variable_explicit_type";

describe("Test of Match Function Parameter", () => {
  expectVariableExplicitTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "snowball",
    "string"
  );
});
