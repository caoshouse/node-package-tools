import { PackageConverter } from './PackageConverter'

export { PackageConverter } from './PackageConverter'
export { Package } from './Package'

export function createHTML(){
    return PackageConverter.getPackage('./').loadTemplateFromFile('./READMETemplate.hbs').saveHTML('docs/index.html')
}