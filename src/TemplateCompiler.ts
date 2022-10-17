import Handlebars from 'handlebars'

function allowInsecurePrototypeAccess(HandlebarsInstance: typeof Handlebars) {
    return wrapCompileFunction(HandlebarsInstance.create())
}

function wrapCompileFunction(handlebarsInstance: typeof Handlebars) {
    const originalCompile = handlebarsInstance.compile
    handlebarsInstance.compile = function compile(templateString, compileOptions) {
        const template = originalCompile.call(this, templateString, compileOptions)
        return function insecureTemplate(context, runtimeOptions) {
            return template(context, extendRuntimeOptions(runtimeOptions))
        }
    }

    return handlebarsInstance
}

function extendRuntimeOptions(runtimeOptions) {
    return {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        ...runtimeOptions
    }
}

export const TemplateCompiler = allowInsecurePrototypeAccess(Handlebars)