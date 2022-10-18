

import { TemplateCompiler } from './TemplateCompiler'
import { Package } from './Package'
import fs from 'fs'
import path from 'path'
import defaultTemplate from './defaultTemplate'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { encodeFromFile } from './DataURI'

import { isObject } from './utils'


type ConfigValue = unknown | string | number | ConfigValue[] | { '@type': string, '@value': string }

const PRIVATE_KEY = Math.random() * 1000 + '.' + (new Date().getTime())


export class PackageConverter extends Package {
    examples: string[]
    private _template = defaultTemplate

    static _cachedModules: { [key: string]: PackageConverter } = {}

    static getPackage(packagePath: string) {
        const ret = this._cachedModules[packagePath] || new this(packagePath, PRIVATE_KEY)
        return ret
    }

    /**
     * @hidden
     * @param packagePath 
     * @param pk 
     */
    constructor(packagePath: string, pk?: string) {
        super(packagePath)
        if (PRIVATE_KEY !== pk) {
            throw new Error('Cannot instantiate Package object with "new". Use Package.getPackage("[path]") instead.')
        }
        const
            constructor = this.getConstructor(),
            t = constructor._cachedModules[packagePath] = this

        let pkg: { [key: string]: unknown }
        try {
            pkg = Object.assign({}, this.getOrigData(), JSON.parse(fs.readFileSync(path.join(packagePath, 'package2md.json')).toString()))
        } catch (_e) {
            return
        }

        if (pkg) Object.keys(pkg).forEach(k => {
            t.modifiers[k] && (pkg[k] = t.modifiers[k](pkg[k]))
            pkg[k] = this.convertToTypedObject(pkg[k])
            Object.defineProperty(t, k, {
                get: function () {
                    return t.getVal(pkg[k])
                },
                configurable: true,
                enumerable: true
            })
        })
    }

    get Modules() {
        const constructor = this.getConstructor()
        const ret = {}
        Object.keys(constructor._cachedModules).forEach(k => {
            ret[constructor._cachedModules[k].name] = constructor._cachedModules[k]
        })
        return ret
    }

    private getVal(x: ConfigValue) {
        //context = context || this
        if (null === x || 'undefined' === typeof x) {
            return null
        }
        if (isObject(x) && !(x instanceof Package)) {
            if (x['@type']) {
                if ('list' === x['@type']) {
                    x = x['@value'].map(v => { return this.getVal(v) })
                } else if (['text', 'string'].includes(x['@type'])) {
                    x = x['@value']
                } else if ('document' === x['@type']) {
                    x = fs.existsSync(x['@value']) ? fs.readFileSync(x['@value']).toString() : null
                } else if ('object' === x['@type']) {
                    x = this.getVal(x['@value'])
                } else if ('image' === x['@type']) {
                    x = encodeFromFile(x['@value'])
                }
            } else {
                Object.keys(x).forEach(k => {
                    x[k] = this.getVal(x[k])
                })
            }
        }
        return ('string' === typeof x) ? TemplateCompiler.compile(x)(this) : x
    }

    /**
     * 
     * @param {any} x 
     * @returns 
     */
    convertToTypedObject(x): { '@type': string, '@value' } {
        if (null === x || 'undefined' === typeof x) {
            return null
        }
        if(x['@type']){
            return x
        }
        if (!!x === x) {
            return {
                '@type': 'boolean',
                '@value': x
            }
        }
        if (Array.isArray(x)) {
            return {
                '@type': 'list',
                '@value': x.map(item => { return this.convertToTypedObject(item) })
            }
        }
        if ('string' === typeof x) {
            return {
                '@type': 'string',
                '@value': x
            }
        }
        if ((typeof x).indexOf('object') && Object.keys(x) && !x['@type']) {
            Object.keys(x).forEach(k => {
                x[k] = this.convertToTypedObject(x[k])
            })
            return {
                '@type': 'object',
                '@value': x
            }
        }
        return x
    }


    
    private modifiers = {
        dependencies: (dependencies) => {
            return Object.keys(dependencies || {}).map((key) => {
                const dependencyPath = path.resolve(this.getPath(), 'node_modules', key)
                if (fs.existsSync(dependencyPath)) {
                    return this.getConstructor().getPackage(dependencyPath)
                }
                return null
            }).filter(n => n)
        },
        devDependencies: (devDependencies) => {
            return Object.keys(devDependencies || {}).map((key) => {
                const dependencyPath = path.resolve(this.getPath(), 'node_modules', key)
                if (fs.existsSync(dependencyPath)) {
                    return this.getConstructor().getPackage(dependencyPath)
                }
                return null
            }).filter(n => n)
        }
    }

    loadTemplateFromFile(templatePath: string) {
        try {
            this._template = fs.readFileSync(templatePath).toString()
        } catch (e) {
            throw new Error('Cannot open template file: ' + templatePath)
        }
        return this
    }

    toHTML() {
        return TemplateCompiler.compile(this._template)(this, { allowedProtoMethods: {} })
    }

    toMD() {
        return NodeHtmlMarkdown.translate(this.toHTML(), {
            useLinkReferenceDefinitions: true,
            keepDataImages: true
        })
    }

    saveHTML(destPath: string) {
        fs.writeFileSync(destPath, this.toHTML())
        return this
    }

    saveMD(destPath: string) {
        fs.writeFileSync(destPath, this.toMD())
        return this
    }
}
