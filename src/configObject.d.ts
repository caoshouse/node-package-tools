/**
 * This def is not complete 
 * https://docs.npmjs.com/cli/v8/using-npm/config
 */
import { Path, Email, IPAddress, SemVer } from './types'

export interface configObject {
    _auth?: string
    /**@default restricted */
    access?: 'restricted' | 'public'
    /**@default false */
    all?: boolean
    /**@default false */
    'allow-same-version'?: boolean
    /**@default true */
    audit?: boolean
    /**@default null */
    'audit-level'?: boolean
    /**@default legacy */
    'auth-type'?: 'legacy' | 'web' | 'sso' | 'saml' | 'oauth' | 'webauthn'
    /**@default:null */
    before?: null | Date

    browser?: null | boolean | string

    ca?: null | string

    cache?: Path

    call?: string

    cert?: string

    'ci-name'?: string

    cidr?: string

    /**@default true */
    color?: 'always' | boolean

    'commit-hooks'?: boolean

    'depth'?: number

    description?: boolean

    diff?: string

    /**
     * Destination prefix to be used in npm diff output. 
     * @default b/
     * */
    'diff-dst-prefix'?: string

    /**
     * Ignore whitespace when comparing lines in npm diff.
     * @default false
     */
    'diff-ignore-all-space'?: boolean

    /**
     * Prints only filenames when using npm diff.
     * @default false
     */
    'diff-name-only'?: boolean

    /**
     * Source prefix to be used in npm diff output.
     * @default a/
     */
    'diff-src-prefix'?: string

    /**
     * Treat all files as text in npm diff.
     * @default false
     */
    'diff-text'?: boolean

    /**
     * The number of lines of context to print in npm diff.
     * @default 3
     */
    'diff-unified'?: number

    /**
     * The command to run for npm edit and npm config edit.
     */
    editor?: string

    'engine-strict'?: boolean

    /**
     * The 'retries' config for the retry module to use when fetching packages from the registry.
     * @default 2
     */
    'fetch-retries'?: number

    /**
     * The 'factor' config for the retry module to use when fetching packages.
     * @default 10
     */
    'fetch-retry-factor'?: number

    /**
     * The 'maxTimeout' config for the retry module to use when fetching packages.
     * @default 60000
     */
    'fetch-retry-maxtimeout'?: number

    /**
     * The 'minTimeout' config for the retry module to use when fetching packages.
     * @default 10000
     */
    'fetch-retry-mintimeout'?: number

    /**
     * The maximum amount of time to wait for HTTP requests to complete.
     * @default 300000
     */
    'fetch-timeout'?: number

    /**
     * Removes various protections against unfortunate side effects, common mistakes, unnecessary performance degradation, and malicious input.
     * @default false
     */
    force?: boolean

    /**
     * Run all build scripts (ie, preinstall, install, and postinstall) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.
     * @default false
     */
    'foreground-scripts'?: boolean

    /**
     * Format package-lock.json or npm-shrinkwrap.json as a human readable file.
     * @default true
     */
    'format-package-lock'?: boolean

    /**
     * When 'true' displays the message at the end of each npm install acknowledging the number of dependencies looking for funding. See npm fund for details.
     * @default true
     */
    fund?: boolean

    /**
     * The command to use for git commands. If git is installed on the computer, but is not in the PATH, then set this to the full path to the git binary.
     * @default git
     */
    git?: string

    /**
     * Tag the commit when using the npm version command. Setting this to false results in no commit being made at all.
     * @default true
     */
    'git-tag-version'?: boolean

    /**
     * Operates in 'global' mode, so that packages are installed into the prefix folder instead of the current working directory. See folders for more on the differences in behavior.
     * @default false
     */
    global?: boolean

    /**
     * Causes npm to install the package into your local node_modules folder with the same layout it uses with the global node_modules folder. Only your direct dependencies will show in node_modules and everything they depend on will be flattened in their node_modules folders. This obviously will eliminate some deduping. If used with legacy-bundling, legacy-bundling will be preferred
     * @default false
     */
    'global-style'?: boolean

    /**
     * The config file to read for global config options.
     */
    globalconfig?: Path

    /**
     * The string that starts all the debugging log output.
     * @default npm
     */
    heading?: string

    /**
     * A proxy to use for outgoing https requests. If the HTTPS_PROXY or https_proxy or HTTP_PROXY or http_proxy environment variables are set, proxy settings will be honored by the underlying make-fetch-happen library.
     * @default null
     */
    'https-proxy'?: URL

    /**
     * If true, npm will not exit with an error code when run-script is invoked for a script that isn't defined in the scripts section of package.json. This option can be used when it's desirable to optionally run a script when it's present and fail if the script fails. This is useful, for example, when running scripts that may only apply for some builds in an otherwise generic CI setup.
     * @default false
     */
    'if-present'?: boolean

    /**
     * If true, npm does not run scripts specified in package.json files.
     * @default false
     */
    'ignore-scripts'?: boolean

    /**
     * Option that allows for defining which types of dependencies to install.
     */
    include?: 'prod' | 'dev' | 'optional' | 'peer'

    /**
     * Allow installing 'staged' published packages, as defined by npm RFC PR #92.
     * @default false
     * @experimental as of npm RFC PR #92
     */
    'include-staged'?: boolean

    /**
     * Include the workspace root when workspaces are enabled for a command.
     * @default false
     */
    'include-workspace-root'?: boolean

    /**
     * The value npm init should use by default for the package author's email.
     */
    'init-author-email'?: Email

    /**
     * The value npm init should use by default for the package author's name.
     */
    'init-author-name'?: string

    /**
     * The value npm init should use by default for the package author's homepage.
     */
    'init-author-url'?: URL

    /**
    * The value npm init should use by default for the package license.
    * @default ISC
    */
    'init-license'?: string

    /**
   * A module that will be loaded by the npm init command. See the documentation for the init-package-json module for more information, or npm init.
   * @default ~/.npm-init.js
   */
    'init-module'?: Path

    /**
    * The value that npm init should use by default for the package version number, if not already set in package.json.
    * @default: '1.0.0'
    */
    'init-version'?: SemVer

    /**
    * When set file: protocol dependencies that exist outside of the project root will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.
    * @default: false
    */
    'install-links'?: boolean

    /**
    * Whether or not to output JSON data, rather than the normal output.
    * @default: false
    */
    'json'?: boolean

    /**
   * A client key to pass when accessing the registry. Values should be in PEM format with newlines replaced by the string '\n'.
   * @example '-----BEGIN PRIVATE KEY-----\nXXXX\nXXXX\n-----END PRIVATE KEY-----'
   * @default: null
   */
    'key'?: string

    /**
     * Causes npm to install the package such that versions of npm prior to 1.4, such as the one included with node 0.8, can install the package. This eliminates all automatic deduping. If used with global-style this option will be preferred.
     */
    'legacy-bundling'?: boolean

    /**
     * Causes npm to completely ignore peerDependencies when building a package tree, as in npm versions 3 through 6.
     */
    'legacy-peer-deps'?: boolean

    /**
    * Used with npm ls, limiting output to only those packages that are linked.
    */
    link?: boolean

    /**
     * The IP address of the local interface to use when making connections to the npm registry. Must be IPv4 in versions of Node prior to 0.12.
     */
    'local-address'?: IPAddress

    /**
     * When passed to npm config this refers to which config file to use.
     */
    location?: 'global' | 'user' | 'project'

    /**
     * Set the lockfile format version to be used in package-lock.json and npm-shrinkwrap-json files
     */
    'lockfile-version'?: 1 | 2 | 3 | '1' | '2' | '3'

    /**
     * What level of logs to report. All logs are written to a debug log, with the path to that file printed if the execution of a command fails.
     */
    loglevel?: 'silent' | 'error' | 'warn' | 'notice' | 'http' | 'timing' | 'info' | 'verbose' | 'silly'

    /**
     * The location of npm's log directory. See npm logging for more information.
     */
    'logs-dir'?: Path

    /**
     * The maximum number of log files to store.
     */
    'logs-max'?: number

    /**
     * Show extended information in ls, search, and help-search.
     */
    long?: boolean

    /**
     * The maximum number of connections to use per origin (protocol/host/port combination).
     */
    maxsockets?: number

    /**
     * Commit message which is used by npm version when creating version commit.
     * Any "%s" in the message will be replaced with the version number.
     */
    message?: string

    /**
     * Options to pass through to Node.js via the NODE_OPTIONS environment variable. This does not impact how npm itself is executed but it does impact how lifecycle scripts are called.
     */
    'node-options'?: string

}