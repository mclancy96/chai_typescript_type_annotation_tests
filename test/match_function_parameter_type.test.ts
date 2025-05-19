import { join } from "path";
import { matchFunctionParameterTypeAnnotation } from "../src/match_function_parameter_type";

describe("Test of Match Function Parameter", () => {
  matchFunctionParameterTypeAnnotation(
    join(__dirname, "./example_tests.ts"),
    "greet",
    ["string", "string"]
  );
});
