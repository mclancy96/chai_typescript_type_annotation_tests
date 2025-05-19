import { join } from "path";
import { expectFunctionParameterTypeAnnotation } from "../src/function_parameter_type";

describe("Test of Function Parameter - Happy Path", () => {
  expectFunctionParameterTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "shout",
    "name",
    "number"
  );
});
describe("Test of Function Parameter - Negative Path", () => {
  expectFunctionParameterTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "shout",
    "greeting",
    "number"
  );
});
