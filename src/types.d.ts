import { configObject } from './configObject'
import { LicenseID } from './LicenseIDs'

export interface FullMetadata {
    name: Name,
    version: Ver,
    description?: string,
    keywords: string[],
    homepage: URL,
    bugs: URL | { url: string, email: string },
    license: License,
    author: Person,
    contributors?: Person[],
    funding?: Funding | Funding[]
    files?: Path[]
    main?: Path
    browser?: boolean
    bin?: Path | { [key: string]: Path }
    man?: Path | Path[]
    directories?: { bin?: Path, man?: Path }
    repository?: Repository
    repositories?: Repository[]
    scripts?: { [key: string]: Script }
    config?: { [key: string]: string | number }
    dependencies?: Dependencies,
    devDependencies?: Dependencies
    peerDependencies?: Dependencies
    peerDependenciesMeta?: Dependencies
    bundledDependencies?: Dependencies
    /**
     * @deprecated
     */
    bundleDependencies?: Dependencies
    optionalDependencies?: Dependencies
    engines?: { [key: string]: SemVer }
    os?: string[]
    cpu?: string[]
    private: boolean
    publishConfig: configObject
    workspaces: Path[]
}

export type Dependencies = { [key: string]: SemVer | URL }
export type IPAddress = string
export type Path = string
export type URL = string
export type Email = string
export type ScopedName = Lowercase<`@${string}/.${string}` | `@${string}/_${string}`>
export type UnscopedName = Lowercase<string>
export type Name = UnscopedName | ScopedName
export type PersonName = string
export type Funding = URL | { type: string, url: URL }
export type Script = string
export type Ver = string
export type SemVer = string

export type License = LicenseID | {
    type: LicenseID,
    url?: URL
}
export type Person = PersonName | {
    name: PersonName,
    url?: URL,
    email?: Email
}
export type Repository = string | {
    type: string,
    url: URL,
    directory?: Path
}