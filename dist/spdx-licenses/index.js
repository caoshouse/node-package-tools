"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getVersion = exports.getReleaseDate = exports.getFreeLicenses = exports.getApprovedLicenses = exports.getLicenses = exports.getAllIds = void 0;
const DATASRCURL = 'https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json';
const http_promise_1 = __importDefault(require("./http-promise"));
const promises_1 = require("fs/promises");
const data_json_1 = __importDefault(require("./data.json"));
const fs_1 = require("fs");
let data = data_json_1.default;
function getAllIds() {
    return data.licenses.map(item => item.licenseId);
}
exports.getAllIds = getAllIds;
function getLicenses() {
    return data.licenses;
}
exports.getLicenses = getLicenses;
function getApprovedLicenses() {
    return data.licenses.filter(item => item.isOsiApproved);
}
exports.getApprovedLicenses = getApprovedLicenses;
function getFreeLicenses() {
    return data.licenses.filter(item => item.isFsfLibre);
}
exports.getFreeLicenses = getFreeLicenses;
function getReleaseDate() {
    return data.releaseDate;
}
exports.getReleaseDate = getReleaseDate;
function getVersion() {
    return data.licenseListVersion;
}
exports.getVersion = getVersion;
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        const origReleaseDate = getReleaseDate();
        const resp = yield (0, http_promise_1.default)(DATASRCURL);
        yield (0, promises_1.writeFile)('./data.json', resp.body);
        data = JSON.parse(resp.body);
        const newReleaseDate = getReleaseDate();
        if (origReleaseDate === newReleaseDate) {
            const pkgJson = (0, fs_1.readFileSync)('./package.json').toString();
            const pkg = JSON.parse(pkgJson);
            const ver = pkg.version.split('.').map((x, index) => {
                if (2 === index) {
                    x = parseInt(x) + 1;
                }
                return x;
            }).join('.');
            pkg.version = ver;
            yield (0, promises_1.writeFile)('./package.json', JSON.stringify(pkg, null, 2));
        }
        return data;
    });
}
exports.update = update;
