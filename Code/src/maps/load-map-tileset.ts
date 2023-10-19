import { CompositeTilemap } from '@pixi/tilemap';
import { Assets, type BaseTexture } from 'pixi.js';

Assets.add({ alias: 'map', src: '/map/map-tileset.json' });
Assets.add({ alias: 'spike', src: '/spike/spike.json' });
Assets.add({ alias: 'torch', src: '/torch/torch.json' });

const mapTexture: BaseTexture[] = await Assets.load(['map', 'spike', 'torch']);

export {
  mapTexture,
};
