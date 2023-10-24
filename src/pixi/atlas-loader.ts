import { Assets, type Texture } from 'pixi.js';

Assets.add({ alias: 'map', src: '/map/map-tileset.json' });
Assets.add({ alias: 'witchIdle', src: '/witch/idle/idle.json' });
Assets.add({ alias: 'witchWalk', src: '/witch/walk/walk.json' });
Assets.add({ alias: 'spike', src: '/spike/spike.json' });
Assets.add({ alias: 'torch', src: '/torch/torch.json' });
Assets.add({ alias: 'key', src: '/key/key.json' });
Assets.add({ alias: 'skeleton', src: '/skeleton/skeleton.json' });
Assets.add({ alias: 'skull', src: '/skull/skull.json' });
Assets.add({ alias: 'lever', src: '/lever/lever.json' });
Assets.add({ alias: 'fireball', src: '/witch/fireball/fireball.json' }); // animationSpeed = 0.18
Assets.add({ alias: 'boss', src: '/boss/boss.json' });
Assets.add({ alias: 'bossFireball', src: '/boss/bossfireball/bossfireball.json' }); //  animationSpeed = 0.15
Assets.add({ alias: 'bossDeath', src: '/boss/bossdeath/bossdeath.json' }); // animationSpeed = 1.18
Assets.add({ alias: 'skeletonwalk', src: '/public/skeleton/skeletonwalk/skeletonwalk.json' });
Assets.add({ alias: 'skeletondeath', src: '/public/skeleton/skeletondeath/skeletondeath.json' });
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
  'lever',
  'fireball',
  'boss',
  'bossDeath',
  'bossFireball',
  'skeletonwalk',
  'skeletondeath',
];

type AtlasLoader = Record<string, { animations: Record<string, Texture[]>; textures: Record<string, Texture> }>;
const atlasLoader: AtlasLoader = await Assets.load(aliases);

export { atlasLoader };
