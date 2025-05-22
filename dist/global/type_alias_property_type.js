"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectTypeAliasPropertyTypeAnnotation = expectTypeAliasPropertyTypeAnnotation;
exports.findTypeAliasPropertyType = findTypeAliasPropertyType;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
function expectTypeAliasPropertyTypeAnnotation(testFilePath, typeAliasName, propertyName, expectedTypeName) {
    it(`should declare '${typeAliasName}' type alias with a ${propertyName} property of type annotation '${expectedTypeName}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const found = findTypeAliasPropertyType(sourceFile, typeAliasName, propertyName);
        return (0, chai_1.expect)(found, `'${typeAliasName}' type alias should have a '${propertyName}' property of type annotation '${expectedTypeName}' but found '${found}'`).to.equal(expectedTypeName);
    });
}
/**
 * Finds the type annotation of a property in a type alias.
 * @param node - The root TypeScript AST node
 * @param typeAliasName - The name of the type alias
 * @param propertyName - The property to check
 * @returns The type annotation as a string, or "" if not found
 */
function findTypeAliasPropertyType(node, typeAliasName, propertyName) {
    if (ts.isTypeAliasDeclaration(node) &&
        node.name.getText() === typeAliasName &&
        ts.isTypeLiteralNode(node.type)) {
        for (const member of node.type.members) {
            if (ts.isPropertySignature(member) &&
                member.name.getText() === propertyName &&
                member.type) {
                return member.type.getText();
            }
        }
    }
    let found = "";
    ts.forEachChild(node, (child) => {
        if (!found) {
            found = findTypeAliasPropertyType(child, typeAliasName, propertyName);
        }
    });
    return found;
}
