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
exports.expectFunctionReturnTypeAnnotation = expectFunctionReturnTypeAnnotation;
exports.matchFunctionParameterTypeAnnotation = matchFunctionParameterTypeAnnotation;
exports.expectFunctionParameterTypeAnnotation = expectFunctionParameterTypeAnnotation;
const chai_1 = require("chai");
const ts = __importStar(require("typescript"));
const fs_1 = require("fs");
function expectVariableExplicitTypeAnnotation(testFilePath, varName, typeName) {
    it(`should declare '${varName}' variable with an explicit type annotation of '${typeName}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        let found = false;
        function checkNode(node) {
            if (ts.isVariableDeclaration(node) &&
                node.name.getText() === varName &&
                node.type &&
                node.type.getText() === typeName) {
                found = true;
            }
            ts.forEachChild(node, checkNode);
        }
        checkNode(sourceFile);
        (0, chai_1.expect)(found, `${varName} variable must have an explicit type annotation of '${typeName}'`).to.be.true;
    });
}
function expectFunctionReturnTypeAnnotation(testFilePath, functionName, returnType) {
    function checkNode(node) {
        if (ts.isFunctionDeclaration(node)) {
            // Handle function declarations as before
            return ((node.name &&
                node.name.getText() === functionName &&
                node.type &&
                node.type.getText() === returnType) ||
                false);
        }
        else if (ts.isArrowFunction(node)) {
            // For arrow functions, check the parent node
            if (ts.isVariableDeclaration(node.parent)) {
                const arrowFunctionName = node.parent.name.getText();
                return ((arrowFunctionName === functionName &&
                    node.type &&
                    node.type.getText() === returnType) ||
                    false);
            }
        }
        return ts.forEachChild(node, checkNode) || false;
    }
    it(`should declare function '${functionName}' with an explicit return type annotation of '${returnType}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        let found = checkNode(sourceFile);
        (0, chai_1.expect)(found, `Function '${functionName}' must have an explicit return type annotation of '${returnType}'`).to.be.true;
    });
}
/**
 * This will allow students to name the variables whatever they want without requiring specific names for each variable.
 * Instead of testing a specific variable's type, it takes an array representing the types expected for the parameters
 * of the function in the order that they appear as parameters of the function.
 * @param testFilePath
 * @param functionName
 * @param parameterTypeArray in the format ['string', 'number', 'boolean']
 * @returns
 */
function matchFunctionParameterTypeAnnotation(testFilePath, functionName, expectedParameterTypeArray) {
    it(`should have parameters with explicit type annotations of: ${expectedParameterTypeArray}`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        function checkNode(node, accumulator) {
            var _a;
            if (ts.isFunctionDeclaration(node) &&
                ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()) === functionName) {
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
            ts.forEachChild(node, (childNode) => checkNode(childNode, accumulator));
        }
        const paramTypes = [];
        checkNode(sourceFile, paramTypes);
        (0, chai_1.expect)(paramTypes, `Expected parameter types [${expectedParameterTypeArray}] but got [${paramTypes}]. Ensure your parameters are typed correctly or at all`).to.have.members(expectedParameterTypeArray);
    });
}
function expectFunctionParameterTypeAnnotation(testFilePath, functionName, paramName, paramType) {
    it(`should declare parameter '${paramName}' of function '${functionName}' with an explicit type annotation of '${paramType}'`, () => {
        const tsCode = (0, fs_1.readFileSync)(testFilePath, "utf8");
        const sourceFile = ts.createSourceFile(testFilePath, tsCode, ts.ScriptTarget.Latest, true);
        let found = false;
        function checkNode(node) {
            var _a;
            if (ts.isFunctionDeclaration(node) &&
                ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText()) === functionName) {
                // Check regular function declarations
                for (const param of node.parameters) {
                    if (param.name.getText() === paramName &&
                        param.type &&
                        param.type.getText() === paramType) {
                        found = true;
                    }
                }
            }
            else if (ts.isArrowFunction(node) &&
                ts.isVariableDeclaration(node.parent)) {
                // Check arrow functions assigned to variables
                if (node.parent.name.getText() === functionName) {
                    for (const param of node.parameters) {
                        if (param.name.getText() === paramName &&
                            param.type &&
                            param.type.getText() === paramType) {
                            found = true;
                        }
                    }
                }
            }
            ts.forEachChild(node, checkNode);
        }
        checkNode(sourceFile);
        (0, chai_1.expect)(found, `Parameter '${paramName}' of function '${functionName}' must have an explicit type annotation of '${paramType}'`).to.be.true;
    });
}
