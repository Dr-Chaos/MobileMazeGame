import { Assets, type Texture } from 'pixi.js';

Assets.add({ alias: 'map', src: '/map/map-tileset.json' });
Assets.add({ alias: 'witchIdle', src: '/witch/idle/witch-idle.json' });
Assets.add({ alias: 'witchWalk', src: '/witch/walk/witch-walk.json' });
Assets.add({ alias: 'witchDamage', src: '/witch/damage/witch-damage.json' }); // animationSpeed = 0.2;
Assets.add({ alias: 'witchDeath', src: '/witch/death/witch-death.json' });
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

const aliases = [
  'map',
  'witchIdle',
  'witchWalk',
  'witchDamage',
  'witchDeath',
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
];

type AtlasLoader = Record<string, { animations: Record<string, Texture[]>; textures: Record<string, Texture> }>;
const atlasLoader: AtlasLoader = await Assets.load(aliases);

export { atlasLoader };
