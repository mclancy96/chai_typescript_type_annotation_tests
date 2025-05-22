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
exports.expectClassPropertyTypeAnnotation = expectClassPropertyTypeAnnotation;
exports.findClassPropertyType = findClassPropertyType;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
/**
 * Tests if a class in a TypeScript file has a property with the expected type annotation.
 *
 * This function creates a test that verifies whether a class has a property with the given name
 * that is explicitly annotated with the specified type in the provided TypeScript file.
 * It uses the TypeScript compiler API to parse and analyze the code.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param className - The name of the class containing the property
 * @param propertyName - The name of the property to check
 * @param typeName - The expected type annotation as a string (exactly as it appears in code)
 *
 * @example
 * // Check if the 'Person' class has a 'name' property with type 'string'
 * expectClassPropertyTypeAnnotation('./src/models.ts', 'Person', 'name', 'string');
 */
function expectClassPropertyTypeAnnotation(testFilePath, className, propertyName, typeName) {
    it(`should declare '${propertyName}' property in class '${className}' with an explicit type annotation of '${typeName}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const found = findClassPropertyType(sourceFile, className, propertyName);
        (0, chai_1.expect)(found, `'${propertyName}' property in class '${className}' must have an explicit type annotation of '${typeName}' but found '${found}'`).to.equal(typeName);
    });
}
function findClassPropertyType(node, className, propertyName) {
    if (ts.isClassDeclaration(node) &&
        node.name &&
        node.name.getText() === className) {
        for (const member of node.members) {
            if (ts.isPropertyDeclaration(member) &&
                member.name &&
                member.name.getText() === propertyName &&
                member.type) {
                return member.type.getText();
            }
        }
    }
    return (ts.forEachChild(node, (childNode) => findClassPropertyType(childNode, className, propertyName)) || "");
}
