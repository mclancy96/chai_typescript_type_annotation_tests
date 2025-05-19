import { join } from "path";
import { expectFunctionReturnTypeAnnotation } from "../src/function_return_type";

describe("Test of Match Function Parameter", () => {
  expectFunctionReturnTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "swim",
    "string"
  );
});
