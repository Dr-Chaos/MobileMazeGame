import { Assets, type BaseTexture } from 'pixi.js';

Assets.add({ alias: 'map', src: '/map/map-tileset.json' });
Assets.add({ alias: 'witchIdle', src: '/witch/idle/idle.json' });
Assets.add({ alias: 'witchWalk', src: '/witch/walk/walk.json' });
Assets.add({ alias: 'spike', src: '/spike/spike.json' });
Assets.add({ alias: 'torch', src: '/torch/torch.json' });
Assets.add({ alias: 'key', src: '/key/key.json' });
Assets.add({ alias: 'skeleton', src: '/skeleton/skeleton.json' });
Assets.add({ alias: 'skull', src: '/skull/skull.json' });

const aliases = [
  'map',
  'witchIdle',
  'witchWalk',
  'spike',
  'torch',
  'key',
  'skeleton',
  'skull',
  'spike',
];

const atlasLoader = await Assets.load(aliases) as BaseTexture[];

export {
  atlasLoader,
};
