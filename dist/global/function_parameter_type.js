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
exports.expectFunctionParameterTypeAnnotation = expectFunctionParameterTypeAnnotation;
exports.findFunctionParameterType = findFunctionParameterType;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
/**
 * Creates a test that checks if a function parameter has the expected type annotation.
 *
 * This function generates a Mocha test that verifies whether a specific parameter
 * in a function has been properly annotated with the specified type. It supports
 * both regular function declarations and arrow functions assigned to variables.
 *
 * @param testFilePath - Path to the TypeScript file containing the function to test
 * @param functionName - Name of the function to check
 * @param paramName - Name of the parameter to check
 * @param paramType - Expected type annotation for the parameter (exact string match)
 *
 * @example
 * ```typescript
 * // Check if the 'name' parameter of 'greet' function has a 'string' type annotation
 * expectFunctionParameterTypeAnnotation(
 *   './src/greeting.ts',
 *   'greet',
 *   'name',
 *   'string'
 * );
 * ```
 */
function expectFunctionParameterTypeAnnotation(testFilePath, functionName, paramName, paramType) {
    it(`should declare parameter '${paramName}' of function '${functionName}' with an explicit type annotation of '${paramType}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        const found = findFunctionParameterType(sourceFile, paramName, functionName);
        (0, chai_1.expect)(found, `Parameter '${paramName}' of function '${functionName}' must have an explicit type annotation of '${paramType}' but found '${found}'`).to.equal(paramType);
    });
}
function findFunctionParameterType(node, paramName, functionName) {
    var _a;
    if (ts.isFunctionDeclaration(node) && ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()) === functionName) {
        // Check regular function declarations
        for (const param of node.parameters) {
            if (param.name.getText() === paramName && param.type) {
                return param.type.getText() || "";
            }
        }
    }
    else if (ts.isArrowFunction(node) &&
        ts.isVariableDeclaration(node.parent)) {
        // Check arrow functions assigned to variables
        if (node.parent.name.getText() === functionName) {
            for (const param of node.parameters) {
                if (param.name.getText() === paramName && param.type) {
                    return param.type.getText() || "";
                }
            }
        }
    }
    return (ts.forEachChild(node, (childNode) => findFunctionParameterType(childNode, paramName, functionName)) || "");
}
