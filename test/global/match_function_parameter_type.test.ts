import { join } from "path";
import { matchFunctionParameterTypeAnnotation } from "../../src/global/match_function_parameter_type";

describe("Test of Match Function Parameter - Happy Path", () => {
  matchFunctionParameterTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "greet",
    ["string"]
  );
});

describe("Test of Match Function Parameter - Negative Path", () => {
  matchFunctionParameterTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "greet",
    ["string", "string"]
  );
});
