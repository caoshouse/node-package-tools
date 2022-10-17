"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const normalize_1 = require("./normalize");
/**
 * a Class that normalizes, checks and extends the package.json file
 */
class Package {
    /**
     *
     * @param {string} packagePath : the package path
     */
    constructor(packagePath) {
        this._origData = {};
        this._path = packagePath;
        let pkg;
        try {
            pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(packagePath, 'package.json')).toString());
        }
        catch (e) {
            throw new Error(`Unable to parse ${packagePath}: ${e.message}`);
        }
        pkg = (0, normalize_1.normalize)(pkg);
        Object.keys(pkg).forEach(k => {
            //normalize.[k] && (pkg[k] = normalize.[k](pkg[k]))
            this._origData[k] = pkg[k];
            Object.defineProperty(this, k, {
                get: () => pkg[k],
                configurable: true,
                enumerable: true
            });
        });
    }
    getOrigData() {
        return this._origData;
    }
    getConstructor() {
        return Object.getPrototypeOf(this).constructor;
    }
    getPath() {
        return this._path;
    }
}
exports.Package = Package;
