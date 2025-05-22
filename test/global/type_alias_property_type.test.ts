import { expect } from "chai";
import * as ts from "typescript";
import { findTypeAliasPropertyType } from "../../src/global/type_alias_property_type";

describe("Type Alias Property Type", () => {
  const code = `
    type User = {
      id: string;
      age: number;
      isActive?: boolean;
    };

    type Product = {
      name: string;
      price: number;
    };

    type Empty = {};
  `;

  it("should find the correct type for a property in a type alias (happy path)", () => {
    const sourceFile = ts.createSourceFile(
      "inline_type_alias.ts",
      code,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findTypeAliasPropertyType(sourceFile, "User", "id")).to.equal(
      "string"
    );
    expect(findTypeAliasPropertyType(sourceFile, "User", "age")).to.equal(
      "number"
    );
    expect(findTypeAliasPropertyType(sourceFile, "User", "isActive")).to.equal(
      "boolean"
    );
    expect(findTypeAliasPropertyType(sourceFile, "Product", "name")).to.equal(
      "string"
    );
    expect(findTypeAliasPropertyType(sourceFile, "Product", "price")).to.equal(
      "number"
    );
  });

  it("should return an empty string for a property that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_type_alias.ts",
      code,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findTypeAliasPropertyType(sourceFile, "User", "notAProp")).to.equal(
      ""
    );
    expect(
      findTypeAliasPropertyType(sourceFile, "Product", "notAProp")
    ).to.equal("");
    expect(findTypeAliasPropertyType(sourceFile, "Empty", "anything")).to.equal(
      ""
    );
  });

  it("should return an empty string for a type alias that does not exist", () => {
    const sourceFile = ts.createSourceFile(
      "inline_type_alias.ts",
      code,
      ts.ScriptTarget.Latest,
      true
    );
    expect(findTypeAliasPropertyType(sourceFile, "NotAType", "id")).to.equal(
      ""
    );
  });
});
