import { Assets, type Texture } from 'pixi.js';
import { Sound } from '@pixi/sound';

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
Assets.add({ alias: 'heart', src: '/hud/heart/heart.json' });
Assets.add({ alias: 'hudkey', src: '/hud/hudkey/hudkey.json' });
Assets.add({ alias: 'musicdungeon2', src: '/sons/musiques/musicdungeon2.mp3' });
Assets.add({ alias: 'keysound', src: '/sons/bruitages/key.wav' });
Assets.add({ alias: 'skeletonsound', src: '/sons/bruitages/skeleton.mp3' });
Assets.add({ alias: 'playerdamagesound', src: '/sons/bruitages/playerdamage.ogg' });
Assets.add({ alias: 'burn', src: '/sons/bruitages/burn.wav' });
Assets.add({ alias: 'burn2', src: '/sons/bruitages/burn2.wav' });
Assets.add({ alias: 'spikesound', src: '/sons/bruitages/spike.wav' });
Assets.add({ alias: 'leversound', src: '/sons/bruitages/levier.wav' });
Assets.add({ alias: 'doorsound', src: '/sons/bruitages/door.wav' });
Assets.add({ alias: 'yoster', src: '/font/yoster.ttf' });
Assets.add({ alias: 'dungeonmusic', src: '/sons/musiques/musicdungeon2.mp3' });
Assets.add({ alias: 'bossdamagesound', src: '/sons/bruitages/boss_damage.wav' });
Assets.add({ alias: 'bosslaughing', src: '/sons/bruitages/bosslaugh.wav' });
Assets.add({ alias: 'burn3', src: '/sons/bruitages/burn3' });
Assets.add({ alias: 'musicwin', src: '/sons/musiques/musicwin.mp3' });
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
  'heart',
  'hudkey',
  'musicdungeon2',
  'keysound',
  'skeletonsound',
  'playerdamagesound',
  'burn',
  'burn2',
  'spikesound',
  'leversound',
  'doorsound',
  'yoster',
  'dungeonmusic',
  'bossdamagesound',
  'bosslaughing',
  'burn3',
  'musicwin',
];

type AtlasLoader = Record<string, { animations: Record<string, Texture[]>; textures: Record<string, Texture> }>;
const atlasLoader: AtlasLoader = await Assets.load(aliases);

export { atlasLoader };
