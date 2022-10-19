"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHTML = exports.Package = exports.PackageConverter = void 0;
const PackageConverter_1 = require("./PackageConverter");
var PackageConverter_2 = require("./PackageConverter");
Object.defineProperty(exports, "PackageConverter", { enumerable: true, get: function () { return PackageConverter_2.PackageConverter; } });
var Package_1 = require("./Package");
Object.defineProperty(exports, "Package", { enumerable: true, get: function () { return Package_1.Package; } });
function createHTML() {
    return PackageConverter_1.PackageConverter.getPackage('./').loadTemplateFromFile('./READMETemplate.hbs').saveHTML('docs/index.html');
}
exports.createHTML = createHTML;
