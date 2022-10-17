"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images2dataURI = void 0;
const DataURI_1 = require("./DataURI");
const jsdom_1 = require("jsdom");
function images2dataURI(html) {
    const dom = new jsdom_1.JSDOM(html), document = dom.window.document;
    Array.from(document.querySelectorAll('img[src]')).forEach(el => {
        const src = el.getAttribute('src');
        if (src) {
            const dataUri = (0, DataURI_1.encodeFromFile)(el.getAttribute('src'));
            el.setAttribute('src', dataUri);
        }
    });
    return dom.serialize();
}
exports.images2dataURI = images2dataURI;
