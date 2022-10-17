import { Package } from './Package';
export declare class PackageConverter extends Package {
    examples: string[];
    private _template;
    static _cachedModules: {
        [key: string]: PackageConverter;
    };
    static getPackage(packagePath: string): PackageConverter;
    /**
     * @hidden
     * @param packagePath
     * @param pk
     */
    constructor(packagePath: string, pk?: string);
    get Modules(): {};
    private getVal;
    /**
     *
     * @param {any} x
     * @returns
     */
    convertToTypedObject(x: any): {
        '@type': string;
        '@value': any;
    };
    private modifiers;
    loadTemplateFromFile(templatePath: string): this;
    toHTML(): string;
    toMD(): string;
    saveHTML(destPath: string): this;
    saveMD(destPath: string): this;
}
