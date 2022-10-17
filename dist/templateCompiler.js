"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCompiler = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
function allowInsecurePrototypeAccess(HandlebarsInstance) {
    return wrapCompileFunction(HandlebarsInstance.create());
}
function wrapCompileFunction(handlebarsInstance) {
    const originalCompile = handlebarsInstance.compile;
    handlebarsInstance.compile = function compile(templateString, compileOptions) {
        const template = originalCompile.call(this, templateString, compileOptions);
        return function insecureTemplate(context, runtimeOptions) {
            return template(context, extendRuntimeOptions(runtimeOptions));
        };
    };
    return handlebarsInstance;
}
function extendRuntimeOptions(runtimeOptions) {
    return Object.assign({ allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true }, runtimeOptions);
}
exports.TemplateCompiler = allowInsecurePrototypeAccess(handlebars_1.default);
