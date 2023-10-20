import { Assets, type Texture } from 'pixi.js';

Assets.add({ alias: 'map', src: '/map/map-tileset.json' });
Assets.add({ alias: 'witchIdle', src: '/witch/idle/idle.json' });
Assets.add({ alias: 'witchWalk', src: '/witch/walk/walk.json' });
Assets.add({ alias: 'spike', src: '/spike/spike.json' });
Assets.add({ alias: 'torch', src: '/torch/torch.json' });
Assets.add({ alias: 'key', src: '/key/key.json' });
Assets.add({ alias: 'skeleton', src: '/skeleton/skeleton.json' });
Assets.add({ alias: 'skull', src: '/skull/skull.json' });
Assets.add({ alias: 'levier', src: '/levier/levier.json' });

const aliases = ['map', 'witchIdle', 'witchWalk', 'spike', 'torch', 'key', 'skeleton', 'skull', 'spike', 'levier'];

type AtlasLoader = Record<string, { animations: Record<string, Texture[]> }>;
const atlasLoader: AtlasLoader = await Assets.load(aliases);

export { atlasLoader };
