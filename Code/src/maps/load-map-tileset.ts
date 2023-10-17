import { CompositeTilemap } from '@pixi/tilemap';
import { Assets, type BaseTexture } from 'pixi.js';

const mapTexture: BaseTexture[] = await Assets.load('/map/map.json');

export {
  mapTexture,
};
