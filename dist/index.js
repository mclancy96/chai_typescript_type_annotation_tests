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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./global/variable_explicit_type"), exports);
__exportStar(require("./global/function_parameter_type"), exports);
__exportStar(require("./global/function_return_type"), exports);
__exportStar(require("./global/match_function_parameter_type"), exports);
__exportStar(require("./class/class_property_type"), exports);
__exportStar(require("./class/class_method_return_type"), exports);
__exportStar(require("./class/match_class_method_parameter_type"), exports);
__exportStar(require("./global/type_alias_property_type"), exports);
