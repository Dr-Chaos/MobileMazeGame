import { Assets } from 'pixi.js';

Assets.add({ alias: 'yoster', src: './fonts/yoster.ttf' });
type FontsLoader = Record<string, FontFace>;
export const fontsLoader: FontsLoader = await Assets.load(['yoster']);
