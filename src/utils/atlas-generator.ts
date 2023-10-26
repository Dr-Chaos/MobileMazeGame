// import this file in index.ts -> open your browser -> Open Dev Tools -> Copy the given code on the console

import { type ISpritesheetData } from 'pixi.js';

// generate tileset atlas
const settings = {
  tileset: {
    width: 72,
    height: 18,
  },
  tile: {
    width: 18,
    height: 18,
  },
};

const tilesetVector = {
  x: settings.tileset.width / settings.tile.width,
  y: settings.tileset.height / settings.tile.height,
};

const frames: Record<string, {
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}> = {};

let totalIterations = 0;
for (let yi = 0; yi < tilesetVector.y; yi++) {
  for (let xi = 0; xi < tilesetVector.x; xi++) {
    const fileName = `skeleton-${totalIterations + 1}.png`;
    const filePath = `${fileName}`;
    frames[filePath] = {
      frame: {
        x: xi * settings.tile.width,
        y: yi * settings.tile.height,
        w: settings.tile.width,
        h: settings.tile.height,
      },
    };

    totalIterations++;
  }
}

const tilesetAtlas: ISpritesheetData = {
  meta: {
    image: 'skeleton.png',
    size: { w: settings.tileset.width, h: settings.tileset.height },
    scale: '1',
  },
  frames,
};

console.log(JSON.stringify(tilesetAtlas));
