
import hostedGitInfo from 'hosted-git-info'

export interface Person {
    name: string,
    url?: string,
    email?: string
}

const normalizeHandlers = {
    _person: (person: string | Person) => {
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
    contributors: (contributors: (string | Person)[]) => {
        return contributors.map(person => {
            return normalizeHandlers._person(person)
        })
    },
    repository: (repository: string) => {
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
    repositories: (repositories) => {
        return repositories.map(repo => {
            return normalizeHandlers.repository(repo)
        })
    },
    private: (isprivate) => { return !!isprivate },
    license: (license) => {
        if ('string' === typeof license) {
            return {
                type: license,
                url: 'https://opensource.org/licenses/' + license
            }
        }
        return license
    },
    licenses: (licenses) => {
        return licenses.map(lic => normalizeHandlers.license(lic))
    }
}


export function normalize(pkg) {
    const defaultFields = {
        name: null,
        version: null,
        license: 'MIT',
        licenses: [],
        repository: null,
        author: null,
        repositories: [],
        private: false,
        scripts: {},
        keywords: [],
        contributors: [],
        devDependencies: {},
        dependencies: {},
        bugs: null,
        funding:null,
        files:null
    }
    pkg = Object.assign({}, defaultFields, pkg)
    Object.keys(pkg).forEach(k => {
        if (normalizeHandlers[k]) {
            pkg[k] = normalizeHandlers[k](pkg[k])
        }
    })
    if (!pkg.licenses||!pkg.licenses.length) {
        pkg.licenses = [pkg.license]
    }
    if (!pkg.repositories||!pkg.repositories.length) {
        pkg.repositories = [pkg.repository]
    }
    console.log(pkg)
    //writeFileSync('packageNormalized.'+(count++)+'.json',JSON.stringify(pkg))
    return pkg
}