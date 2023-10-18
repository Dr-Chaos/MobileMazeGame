import { Graphics } from "pixi.js";
import { camera } from "./player/camera";
import { playerContainer } from "./player/player";
import app from "./pixi/initialize";

const fireball = new Graphics()
playerContainer.addChild(fireball)
fireball.beginFill("orange")
fireball.drawRect(70,0,30,30)

function moveFireball(){

    //fireball.x += 0.1
    fireball.pivot.x = (fireball.width / fireball.scale.x) * 0.5;
    fireball.pivot.y = (fireball.height / fireball.scale.y) * 0.5;
    
}
app.ticker.add(moveFireball)