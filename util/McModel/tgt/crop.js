"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crop = void 0;
const sharp_1 = __importDefault(require("sharp"));
const srcPath = './util/McModel/minecraft/textures/';
const tgtPath = './public/assets/minecraft/textures/';
const hex = (val) => [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
][val];
async function crop(filename, uv) {
    const image = (0, sharp_1.default)(srcPath + filename + '.png'); // トリミング
    const tgtfilename = filename + '.' + uv.map(hex).join('') + '.png';
    await image
        .extract({
        left: uv[0],
        top: uv[1],
        width: uv[2] - uv[0],
        height: uv[3] - uv[1],
    })
        .toFile(tgtPath + tgtfilename);
    return tgtfilename;
}
exports.crop = crop;
