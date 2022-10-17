/**
 * a Class that normalizes, checks and extends the package.json file
 */
export declare class Package {
    private _origData;
    private _path;
    getOrigData(): {};
    getConstructor(): any;
    getPath(): string;
    /**
     *
     * @param {string} packagePath : the package path
     */
    constructor(packagePath: string);
}
