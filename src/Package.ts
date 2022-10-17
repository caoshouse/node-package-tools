import path from 'path'
import fs from 'fs'

import {normalize} from './normalize'



/**
 * a Class that normalizes, checks and extends the package.json file
 */
export class Package {

    private _origData = {}
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
        let pkg: { [key: string]: any }
        try {
            pkg = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json')).toString())
        } catch (e) {
            throw new Error(`Unable to parse ${packagePath}: ${e.message}`)
        }

        pkg = normalize(pkg)

        Object.keys(pkg).forEach(k => {
            //normalize.[k] && (pkg[k] = normalize.[k](pkg[k]))
            this._origData[k] = pkg[k]
            Object.defineProperty(this, k, {
                get: () => pkg[k],
                configurable: true,
                enumerable: true
            })
        })

    }
}


