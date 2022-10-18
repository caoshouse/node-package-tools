import path from 'path'
import fs from 'fs'
import { FullMetadata } from './types'
import { normalize } from './normalize'



/**
 * a Class that normalizes, checks and extends the package.json file
 */
export class Package {

    private _origData: Partial<FullMetadata> = {}
    private _path: string

    getOrigData() {
        return this._origData
    }

    getConstructor() {
        return Object.getPrototypeOf(this).constructor
    }

    getPath() {
        return this._path
    }


    /**
     * 
     * @param {string} packagePath : the package path
     */
    constructor(packagePath: string) {
        this._path = packagePath
        let pkg: FullMetadata
        try {
            pkg = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json')).toString())
        } catch (e) {
            throw new Error(`Unable to parse ${packagePath}: ${e.message}`)
        }

        pkg = normalize(pkg)

        Object.keys(pkg).forEach(k => {
            this._origData[k] = pkg[k]
            Object.defineProperty(this, k, {
                get: () => pkg[k],
                configurable: true,
                enumerable: true
            })
        })

    }
}


