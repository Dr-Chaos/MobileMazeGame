import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ 
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
}); 
document.body.appendChild(app.view); 

const camera = new PIXI.Container();
app.stage.addChild(camera);

function updateCamera() {
    camera.position.x = Math.min(Math.max(camera.position.x, 0), worldWidth - app.renderer.width);
    camera.position.y = Math.min(Math.max(camera.position.y, 0), worldHeight - app.renderer.height);
}

function update(delta: number) { 
    updateCamera();
 
    app.ticker.add((delta) => {
        update(delta);
    });
}
update(0); 
