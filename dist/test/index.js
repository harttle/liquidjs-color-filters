"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const liquidjs_1 = require("liquidjs");
const chai_1 = require("chai");
const index_1 = require("../src/index");
describe('color filters', function () {
    let liquid;
    before(function () {
        liquid = new liquidjs_1.default();
        liquid.plugin(index_1.liquidColorFilters);
    });
    describe('color_to_rgb', function () {
        it('should converts a CSS color string to CSS rgb() format', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_to_rgb }}');
            chai_1.expect(html).to.equal('rgb(122, 181, 92)');
        }));
        it('should return as it is if not valid', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "what" | color_to_rgb }}');
            chai_1.expect(html).to.equal('what');
        }));
        it('should convert hsla', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "hsla(100, 38%, 54%, 0.5)" | color_to_rgb }}');
            chai_1.expect(html).to.equal('rgba(123, 182, 93, 0.5)');
        }));
    });
    describe('color_to_hsl', function () {
        it('should converts a CSS color string to CSS hsl() format.', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_to_hsl }}');
            chai_1.expect(html).to.equal('hsl(100, 38%, 54%)');
        }));
        it('should converts a CSS color string to CSS hsl() format.', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "rgba(122, 181, 92, 0.5)" | color_to_hsl }}');
            chai_1.expect(html).to.equal('hsla(100, 38%, 54%, 0.5)');
        }));
    });
    describe('color_to_hex', function () {
        it('should converts a CSS color string to hex6 format', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{"rgb(122, 181, 92)"| color_to_hex}}');
            chai_1.expect(html).to.equal('#7ab55c');
        }));
        it('hex output is always in hex6 format', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{"rgba(122, 181, 92, 0.5)"|color_to_hex}}');
            chai_1.expect(html).to.equal('#7ab55c');
        }));
    });
    describe('color_extract', function () {
        it('extract the given component of a color', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{"#7ab55c" | color_extract: "red" }}');
            chai_1.expect(html).to.equal('122');
        }));
    });
    describe('color_brightness', function () {
        it('should compute brightness according to W3C/AERT', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_brightness }}');
            chai_1.expect(html).to.equal('153.21');
        }));
    });
    describe('color_modify', function () {
        it('should modify the given component of a color', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_modify: "red", 255 }}');
            chai_1.expect(html).to.equal('rgb(255, 181, 92)');
        }));
        it('should support alpha', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_modify: "alpha", 0.85 }}');
            chai_1.expect(html).to.equal('rgba(122, 181, 92, 0.85)');
        }));
    });
    describe('color_lighten', function () {
        it('should lighten the input color.', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_lighten: 30 }}');
            chai_1.expect(html).to.equal('rgb(169, 208, 149)');
        }));
    });
    describe('color_darken', function () {
        it('should darken the input color.', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_darken: 30 }}');
            chai_1.expect(html).to.equal('rgb(82, 130, 59)');
        }));
    });
    describe('color_saturate', function () {
        it('should saturates the input color', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_saturate: 30 }}');
            chai_1.expect(html).to.equal('rgb(118, 194, 79)');
        }));
    });
    describe('color_desaturate', function () {
        it('should desaturates the input color.', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_desaturate: 30 }}');
            chai_1.expect(html).to.equal('rgb(126, 168, 105)');
        }));
    });
    describe('color_mix', function () {
        it('Blends together two colors', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#7ab55c" | color_mix: "#ffc0cb", 50 }}');
            chai_1.expect(html).to.equal('rgb(189, 187, 148)');
        }));
        it('Blends together two colors', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "rgba(122, 181, 92, 0.75)" | color_mix: "#ffc0cb", 50 }}');
            chai_1.expect(html).to.equal('rgba(189, 187, 148, 0.875)');
        }));
    });
    describe('color_contrast', function () {
        it('should calculates the contrast ratio between two colors', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#495859" | color_contrast: "#fffffb" }}');
            chai_1.expect(html).to.equal('7.4');
        }));
    });
    describe('color_difference', function () {
        it('should calculates the color difference or distance between two colors', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#ff0000" | color_difference: "#abcdef" }}');
            chai_1.expect(html).to.equal('528');
        }));
    });
    describe('brightness_difference', function () {
        it('should calculates the perceived brightness difference between two colors', () => __awaiter(this, void 0, void 0, function* () {
            const html = yield liquid.parseAndRender('{{ "#fff00f" | brightness_difference: "#0b72ab" }}');
            chai_1.expect(html).to.equal('129');
        }));
    });
});
