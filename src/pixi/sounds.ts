import { Sound } from '@pixi/sound';

export const sounds = {
  background: Sound.from('/sounds/musics/musicdungeon2.mp3'),
  win: Sound.from('/sounds/musics/musicwin.mp3'),
  key: Sound.from('/sounds/effects/key.wav'),
  playerDamage: Sound.from('/sounds/effects/playerdamage.ogg'),
  playerDeath: Sound.from('/sounds/effects/burn4.wav'),
  playerScream: Sound.from('/sounds/effects/playerdeath.ogg'),
  bossDamage: Sound.from('/sounds/effects/boss_damage.wav'),
  bossLaugh: Sound.from('/sounds/effects/bosslaugh.wav'),
  bossDoor: Sound.from('/sounds/effects/boss_door.wav'),
  skeletonDamage: Sound.from('/sounds/effects/skeleton.mp3'),
  skeletonDeath: Sound.from('/sounds/effects/burn.wav'),
  door: Sound.from('/sounds/effects/door.wav'),
  lever: Sound.from('/sounds/effects/levier.wav'),
  spike: Sound.from('/sounds/effects/spike.wav'),
  bossDeath: Sound.from('/sounds/effects/burn2.wav'),
};

sounds.background.loop = true;
sounds.key.volume = 0.4;
sounds.spike.volume = 0.2;
sounds.bossDamage.volume = 0.75;
sounds.bossDeath.volume = 2;
sounds.skeletonDeath.volume = 0.35;
