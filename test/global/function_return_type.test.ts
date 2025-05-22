import { join } from "path";
import { expectFunctionReturnTypeAnnotation } from "../../src/global/function_return_type";

describe("Test of Function Return - Happy Path", () => {
  expectFunctionReturnTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "swim",
    "string"
  );
});
describe("Test of Function Return - Negative Path", () => {
  expectFunctionReturnTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "swimmer",
    "string"
  );
});
