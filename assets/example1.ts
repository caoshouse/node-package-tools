import fs from 'fs'
export function createReadme(packagePath: string, template: string = defaultTemplate) {
    const pkg = ModifiedPackage.getPackage(packagePath)
    console.log(Object.keys(ModifiedPackage._modules))
    fs.writeFileSync(path.join(packagePath, 'README.md'), hogan.compile(template).render(pkg))
}
