

import hostedGitInfo from 'hosted-git-info'
import { FullMetadata, License, Person, Repository } from './types'

const normalizeHandlers = {
    _person: (person: Person | string) => {
        person = person || { name: null, url: null, email: null }
        if ('string' === typeof person) {
            person = {
                name: person.replace(/<[\s\S]{0,}>/gi, '').replace(/\([\s\S]{0,}\)/gi, '').trim(),
                url: (person.match(/http[s]{0,1}:[^)]{0,}/gi) || [])[0],
                email: (person.match(/(?<=<)(.+?)(?=>)/gi) || [])[0]
            }
        }
        Object.keys(person).forEach(k => {
            person[k] = person[k] || null
        })
        return person
    },
    author: (author: string | Person) => {
        return normalizeHandlers._person(author)
    },
    contributors: (contributors: Person[]) => {
        return contributors.map(person => {
            return normalizeHandlers._person(person)
        })
    },
    repository: (repository: Repository) => {
        if ('string' === typeof repository) {
            const
                hosted = hostedGitInfo.fromUrl(repository),
                ret = {
                    type: null,
                    url: null,
                    path: null
                }
            if (hosted) {
                ret.type = hosted.type
                ret.url = hosted.browse()
                ret.path = hosted.path()
            } else {
                console.warn('Unable to recognize Repository: "' + repository + '"')
                return repository
            }
            return ret
        }
        return repository
    },
    repositories: (repositories: Repository[]) => {
        return repositories.map(repo => {
            return normalizeHandlers.repository(repo)
        })
    },
    private: (isprivate: boolean) => { return !!isprivate },
    license: (license: License) => {
        if ('string' === typeof license) {
            return {
                type: license,
                url: 'https://opensource.org/licenses/' + license
            }
        }
        return license
    },
    licenses: (licenses: License[]) => {
        return licenses.map(lic => normalizeHandlers.license(lic))
    }
}


export function normalize(pkg: FullMetadata) {
    const defaultFields: Partial<FullMetadata> = {
        name: null,
        version: null,
        license: 'MIT',
        repository: null,
        author: null,
        repositories: [],
        private: false,
        scripts: {},
        keywords: [],
        contributors: [],
        devDependencies: {},
        dependencies: {},
        funding: null,
        files: null,
        bundledDependencies: {},
        bugs: null,
        homepage: null
    }
    pkg = Object.assign({}, defaultFields, pkg)
    Object.keys(pkg).forEach(k => {
        if (normalizeHandlers[k]) {
            pkg[k] = normalizeHandlers[k](pkg[k])
        }
    })
    /*if (!pkg.licenses||!pkg.licenses.length) {
        pkg.licenses = [pkg.license]
    }*/
    if (!pkg.repositories || !pkg.repositories.length) {
        pkg.repositories = [pkg.repository]
    }
    if (pkg.bundleDependencies && !pkg.bundledDependencies) {
        pkg.bundledDependencies = pkg.bundleDependencies
    }
    //writeFileSync('packageNormalized.'+(count++)+'.json',JSON.stringify(pkg))
    return pkg
}