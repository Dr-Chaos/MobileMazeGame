// import './utils/atlas-generator';
import './map/map-layers';
import './map/map-collisions';
import app from './pixi/initialize';
import { camera } from './camera';
import './player/move'; // handle move inputs
import './player/fireball';
import './map-objects/skull';

app.stage.addChild(camera); // create the world / camera
