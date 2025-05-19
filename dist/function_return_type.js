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
exports.expectFunctionReturnTypeAnnotation = expectFunctionReturnTypeAnnotation;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
/**
 * Tests if a function in a TypeScript file has an explicit return type annotation.
 * This function creates a test case that verifies whether a specified function has
 * the expected return type annotation.
 *
 * @param testFilePath - The path to the TypeScript file containing the function to test
 * @param functionName - The name of the function to check for return type annotation
 * @param returnType - The expected return type that should be explicitly declared
 *
 * @example
 * ```
 * expectFunctionReturnTypeAnnotation(
 *   './src/utils.ts',
 *   'calculateTotal',
 *   'number'
 * );
 * ```
 *
 * @remarks
 * This function can check both function declarations and arrow functions assigned to variables.
 * For arrow functions, it examines the parent node to find the variable name.
 */
function expectFunctionReturnTypeAnnotation(testFilePath, functionName, returnType) {
    it(`should declare function '${functionName}' with an explicit return type annotation of '${returnType}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const found = findNode(sourceFile, functionName);
        (0, chai_1.expect)(found, `Function '${functionName}' must have an explicit return type annotation of '${returnType}' but found '${found}'`).to.deep.equal(returnType);
    });
}
function findNode(node, functionName) {
    if (ts.isFunctionDeclaration(node)) {
        // Handle function declarations as before
        if (node.name && node.name.getText() === functionName && node.type) {
            return node.type.getText();
        }
    }
    else if (ts.isArrowFunction(node)) {
        // For arrow functions, check the parent node
        if (ts.isVariableDeclaration(node.parent)) {
            const arrowFunctionName = node.parent.name.getText();
            if (arrowFunctionName === functionName && node.type) {
                return node.type.getText();
            }
        }
    }
    return (ts.forEachChild(node, (childNode) => findNode(childNode, functionName)) ||
        "");
}
