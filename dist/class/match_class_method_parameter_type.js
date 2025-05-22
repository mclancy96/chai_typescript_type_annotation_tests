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
exports.matchClassMethodParameterTypeAnnotation = matchClassMethodParameterTypeAnnotation;
exports.findClassMethodParameterTypes = findClassMethodParameterTypes;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
/**
 * Tests if a class method has parameters with specific type annotations.
 * Works for both public and private methods.
 *
 * @param testFilePath - The path to the TypeScript file to test
 * @param className - The name of the class containing the method
 * @param methodName - The name of the method whose parameters to check
 * @param expectedParameterTypeArray - An array of expected parameter types as strings (e.g., ['string', 'number'])
 * @returns A Mocha test case that verifies parameter type annotations
 *
 * @example
 * // Test if User.getFullName has parameters of type string and number
 * matchClassMethodParameterTypeAnnotation('path/to/file.ts', 'User', 'getFullName', ['string', 'number']);
 */
function matchClassMethodParameterTypeAnnotation(testFilePath, className, methodName, expectedParameterTypeArray) {
    it(`${className}.${methodName} should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
        const tsCode = require("fs").readFileSync(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const paramTypes = [];
        findClassMethodParameterTypes(sourceFile, className, methodName, paramTypes);
        (0, chai_1.expect)(paramTypes, `Expected ${className}.${methodName} to have parameter types [${expectedParameterTypeArray}] but got [${paramTypes}].`).to.deep.equal(expectedParameterTypeArray);
    });
}
/**
 * Recursively finds the parameter types of a class method and pushes them to the accumulator.
 */
function findClassMethodParameterTypes(node, className, methodName, accumulator) {
    var _a, _b;
    if (ts.isClassDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()) === className) {
        for (const member of node.members) {
            if (ts.isMethodDeclaration(member) &&
                member.name.getText() === methodName) {
                for (const param of member.parameters) {
                    accumulator.push(((_b = param.type) === null || _b === void 0 ? void 0 : _b.getText()) || "");
                }
            }
        }
    }
    ts.forEachChild(node, (childNode) => findClassMethodParameterTypes(childNode, className, methodName, accumulator));
}
