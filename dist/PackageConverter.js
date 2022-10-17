"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageConverter = void 0;
const TemplateCompiler_1 = require("./TemplateCompiler");
const Package_1 = require("./Package");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const defaultTemplate_1 = __importDefault(require("./defaultTemplate"));
const node_html_markdown_1 = require("node-html-markdown");
const DataURI_1 = require("./DataURI");
const utils_1 = require("./utils");
const PRIVATE_KEY = Math.random() * 1000 + '.' + (new Date().getTime());
class PackageConverter extends Package_1.Package {
    /**
     * @hidden
     * @param packagePath
     * @param pk
     */
    constructor(packagePath, pk) {
        super(packagePath);
        this._template = defaultTemplate_1.default;
        this.modifiers = {
            dependencies: (dependencies) => {
                return Object.keys(dependencies || {}).map((key) => {
                    const dependencyPath = path_1.default.resolve(this.getPath(), 'node_modules', key);
                    if (fs_1.default.existsSync(dependencyPath)) {
                        return this.getConstructor().getPackage(dependencyPath);
                    }
                    return null;
                }).filter(n => n);
            },
            devDependencies: (devDependencies) => {
                return Object.keys(devDependencies || {}).map((key) => {
                    const dependencyPath = path_1.default.resolve(this.getPath(), 'node_modules', key);
                    if (fs_1.default.existsSync(dependencyPath)) {
                        return this.getConstructor().getPackage(dependencyPath);
                    }
                    return null;
                }).filter(n => n);
            }
        };
        if (PRIVATE_KEY !== pk) {
            throw new Error('Cannot instantiate Package object with "new". Use Package.getPackage("[path]") instead.');
        }
        const constructor = this.getConstructor(), t = constructor._cachedModules[packagePath] = this;
        let pkg;
        try {
            pkg = Object.assign({}, this.getOrigData(), JSON.parse(fs_1.default.readFileSync(path_1.default.join(packagePath, 'package2md.json')).toString()));
        }
        catch (_e) {
            return;
        }
        if (pkg)
            Object.keys(pkg).forEach(k => {
                t.modifiers[k] && (pkg[k] = t.modifiers[k](pkg[k]));
                pkg[k] = this.convertToTypedObject(pkg[k]);
                Object.defineProperty(t, k, {
                    get: function () {
                        return t.getVal(pkg[k]);
                    },
                    configurable: true,
                    enumerable: true
                });
            });
    }
    static getPackage(packagePath) {
        const ret = this._cachedModules[packagePath] || new this(packagePath, PRIVATE_KEY);
        return ret;
    }
    get Modules() {
        const constructor = this.getConstructor();
        const ret = {};
        Object.keys(constructor._cachedModules).forEach(k => {
            ret[constructor._cachedModules[k].name] = constructor._cachedModules[k];
        });
        return ret;
    }
    getVal(x) {
        //context = context || this
        if (null === x || 'undefined' === typeof x) {
            return null;
        }
        if ((0, utils_1.isObject)(x) && !(x instanceof Package_1.Package)) {
            if (x['@type']) {
                if ('list' === x['@type']) {
                    x = x['@value'].map(v => { return this.getVal(v); });
                }
                else if (['text', 'string'].includes(x['@type'])) {
                    x = x['@value'];
                }
                else if ('document' === x['@type']) {
                    x = fs_1.default.existsSync(x['@value']) ? fs_1.default.readFileSync(x['@value']).toString() : null;
                }
                else if ('object' === x['@type']) {
                    x = this.getVal(x['@value']);
                }
                else if ('image' === x['@type']) {
                    x = (0, DataURI_1.encodeFromFile)(x['@value']);
                }
            }
            else {
                Object.keys(x).forEach(k => {
                    x[k] = this.getVal(x[k]);
                });
            }
        }
        return ('string' === typeof x) ? TemplateCompiler_1.TemplateCompiler.compile(x)(this) : x;
    }
    /**
     *
     * @param {any} x
     * @returns
     */
    convertToTypedObject(x) {
        if (null === x || 'undefined' === typeof x) {
            return null;
        }
        if (x['@type']) {
            return x;
        }
        if (!!x === x) {
            return {
                '@type': 'boolean',
                '@value': x
            };
        }
        if (Array.isArray(x)) {
            return {
                '@type': 'list',
                '@value': x.map(item => { return this.convertToTypedObject(item); })
            };
        }
        if ('string' === typeof x) {
            return {
                '@type': 'string',
                '@value': x
            };
        }
        if ((typeof x).indexOf('object') && Object.keys(x) && !x['@type']) {
            Object.keys(x).forEach(k => {
                x[k] = this.convertToTypedObject(x[k]);
            });
            return {
                '@type': 'object',
                '@value': x
            };
        }
        return x;
    }
    loadTemplateFromFile(templatePath) {
        try {
            this._template = fs_1.default.readFileSync(templatePath).toString();
        }
        catch (e) {
            throw new Error('Cannot open template file: ' + templatePath);
        }
        return this;
    }
    toHTML() {
        return TemplateCompiler_1.TemplateCompiler.compile(this._template)(this, { allowedProtoMethods: {} });
    }
    toMD() {
        return node_html_markdown_1.NodeHtmlMarkdown.translate(this.toHTML(), {
            useLinkReferenceDefinitions: true,
            keepDataImages: true
        });
    }
    saveHTML(destPath) {
        fs_1.default.writeFileSync(destPath, this.toHTML());
        return this;
    }
    saveMD(destPath) {
        fs_1.default.writeFileSync(destPath, this.toMD());
        return this;
    }
}
exports.PackageConverter = PackageConverter;
PackageConverter._cachedModules = {};
