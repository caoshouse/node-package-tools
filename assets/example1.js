"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadme = void 0;
const fs_1 = __importDefault(require("fs"));
function createReadme(packagePath, template = defaultTemplate) {
    const pkg = ModifiedPackage.getPackage(packagePath);
    console.log(Object.keys(ModifiedPackage._modules));
    fs_1.default.writeFileSync(path.join(packagePath, 'README.md'), hogan.compile(template).render(pkg));
}
exports.createReadme = createReadme;
