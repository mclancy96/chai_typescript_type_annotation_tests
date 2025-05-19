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
exports.expectVariableExplicitTypeAnnotation = expectVariableExplicitTypeAnnotation;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
/**
 * Tests if a variable in a TypeScript file has an explicit type annotation of the expected type.
 *
 * This function creates a test that verifies whether a variable with the given name
 * has been explicitly annotated with the specified type in the provided TypeScript file.
 * It uses the TypeScript compiler API to parse and analyze the code.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param varName - The name of the variable to check for type annotation
 * @param typeName - The expected type annotation as a string (exactly as it appears in code)
 *
 * @example
 * // Check if the 'user' variable has an explicit 'Person' type annotation
 * expectVariableExplicitTypeAnnotation('./src/users.ts', 'user', 'Person');
 */
function expectVariableExplicitTypeAnnotation(testFilePath, varName, typeName) {
    it(`should declare '${varName}' variable with an explicit type annotation of '${typeName}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const found = findNode(sourceFile, varName);
        (0, chai_1.expect)(found, `'${varName}' variable must have an explicit type annotation of '${typeName}' but found '${found}'`).to.equal(typeName);
    });
}
function findNode(node, varName) {
    var _a;
    if (ts.isVariableDeclaration(node) && node.name.getText() === varName) {
        return ((_a = node.type) === null || _a === void 0 ? void 0 : _a.getText()) || "";
    }
    return (ts.forEachChild(node, (childNode) => {
        return findNode(childNode, varName);
    }) || "");
}
