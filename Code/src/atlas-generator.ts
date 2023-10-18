// import this file in index.ts -> open your browser -> Open Dev Tools -> Copy the given code on the console

import { type ISpritesheetData } from 'pixi.js';

// generate tileset atlas
const settings = {
  tileset: {
    width: 48,
    height: 32,
  },
  tile: {
    width: 16,
    height: 16,
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
    const fileName = 'map.png';
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
    image: 'map.png',
    size: { w: settings.tileset.width, h: settings.tileset.height },
    scale: '1',
  },
  frames,
};

console.log(JSON.stringify(tilesetAtlas));
