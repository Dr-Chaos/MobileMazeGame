import { AnimatedSprite } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { camera } from '../camera';
import { atlasLoader } from '../pixi/atlas-loader';
import { collisionResponseDirection, isColliding } from '../math/collisions';
import { player } from '../player/player';
import { movePlayer } from '../player/move';
import { keys } from './key';
import { spikes } from './spike';
import { mapScaling } from '../map/map-layers';
import { doorRoomBottom, doorsContainers } from './door';
import { gameConditions } from '../map/game-conditions';
import { sounds } from '../sounds';

type Lever = AnimatedSprite & { canBeActivated: boolean};
export const levers: Lever[] = [];
export function createLever(x: number, y: number, name: string) {
  const lever = new AnimatedSprite(atlasLoader.lever.animations.idle) as Lever;
  lever.scale.set(mapScaling);
  lever.animationSpeed = 0;
  lever.play();
  lever.x = x;
  lever.y = y;
  lever.zIndex = -1;
  lever.name = name;
  lever.canBeActivated = true;
  lever.onLoop = () => {
    const lastFrameIndex = lever.totalFrames - 1;
    lever.gotoAndStop(lastFrameIndex);

    // levier1
    setTimeout(() => {
      if (name === 'lever1') {
        const key1 = keys.find((key) => key.name === 'key1')!;
        key1.visible = true;
        sounds.lever.play();
        sounds.lever.volume = 5;
      }
    }, 135);

    // levier 2, 3 et 4
    if (name === 'lever2' || name === 'lever3' || name === 'lever4') {
      const spikesRoom1 = spikes.filter((spike) => spike.sprite.name === 'spikeRoom1');
      for (const spike of spikesRoom1) {
        spike.sprite.visible = true;
        spike.sprite.play();
        sounds.lever.play();
        sounds.lever.volume = 0.1;
        sounds.spike.play();
        sounds.spike.volume = 0.2;
        sounds.playerDamage.play();
        sounds.playerDamage.volume = 0.2;
      }
    }

    // lever porte du bas
    if (name === 'leverDoorBottom') {
      camera.removeChild(doorRoomBottom);
      doorsContainers.list = doorsContainers.list.filter((doorContainer) => doorContainer !== doorRoomBottom);
      sounds.lever.play();
      sounds.lever.volume = 1.5;
      sounds.door.play();
      sounds.door.volume = 2;
    }

    // lever boss room
    if (name === 'leverBossGood') {
      gameConditions.leverToAttackTheBoss -= 1;
      console.log(gameConditions.leverToAttackTheBoss);
      sounds.lever.play();
      sounds.lever.volume = 1.5;
    }

    if (name === 'leverBossBad') {
      for (const spike of spikes) {
        if (spike.sprite.name !== 'spikeBossLever') continue;
        spike.sprite.visible = true;
        spike.sprite.play();

        sounds.lever.play();
        sounds.spike.play();
        sounds.spike.volume = 0.5;
        sounds.playerDamage.play();
        sounds.playerDamage.volume = 0.5;
      }
    }
  };

  camera.addChild(lever);
  levers.push(lever);
}

export function leversGameLoop() {
  for (const lever of levers) {
    if (isColliding(player.hitbox, lever)) {
      movePlayer(collisionResponseDirection(player.hitbox, lever), 1);
      if (!lever.canBeActivated) return;
      lever.canBeActivated = false;
      lever.animationSpeed = 0.2;
    }
  }
}
