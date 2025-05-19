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
exports.matchFunctionParameterTypeAnnotation = matchFunctionParameterTypeAnnotation;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
/**
 * Tests if a function has parameters with specific type annotations.
 * This function allows flexibility in variable naming while ensuring correct type annotations.
 * It works with both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param functionName - The name of the function whose parameters to check
 * @param expectedParameterTypeArray - An array of expected parameter types as strings (e.g., ['string', 'number', 'boolean'])
 * @returns A Mocha test case that verifies parameter type annotations
 *
 * @example
 * // Test if myFunction has string and number parameters
 * matchFunctionParameterTypeAnnotation('path/to/file.ts', 'myFunction', ['string', 'number']);
 */
function matchFunctionParameterTypeAnnotation(testFilePath, functionName, expectedParameterTypeArray) {
    it(`${functionName} should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const paramTypes = [];
        findNodes(sourceFile, functionName, paramTypes, expectedParameterTypeArray);
        (0, chai_1.expect)(paramTypes, `Expected ${functionName} to have parameter types [${expectedParameterTypeArray}] but got [${paramTypes}]. Ensure your parameters are defined and typed accordingly.`).to.have.members(expectedParameterTypeArray);
    });
}
function findNodes(node, functionName, accumulator, expectedParameterTypeArray) {
    var _a;
    if (ts.isFunctionDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()) === functionName) {
        // Check regular function declarations
        for (const param of node.parameters) {
            if (param.type &&
                expectedParameterTypeArray.includes(param.type.getText())) {
                accumulator.push(param.type.getText());
            }
        }
    }
    else if (ts.isArrowFunction(node) &&
        ts.isVariableDeclaration(node.parent)) {
        // Check arrow functions assigned to variables
        if (node.parent.name.getText() === functionName) {
            for (const param of node.parameters) {
                if (param.type &&
                    expectedParameterTypeArray.includes(param.type.getText())) {
                    accumulator.push(param.type.getText());
                }
            }
        }
    }
    ts.forEachChild(node, (childNode) => findNodes(childNode, functionName, accumulator, expectedParameterTypeArray));
}
