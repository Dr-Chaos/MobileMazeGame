*/

/* //////////////////////////// CREATION DES FIREBALLS  //////////////////////////// 
const bossFireball = new AnimatedSprite(atlasLoader.fireball.animations.idle);
const bossFireball1 = new AnimatedSprite(atlasLoader.fireball.animations.idle);
const bossFireball2 = new AnimatedSprite(atlasLoader.fireball.animations.idle);
const fireballs = [bossFireball, bossFireball1, bossFireball2];
for (const fireball of [bossFireball, bossFireball1, bossFireball2]) {
  fireball.scale.set(0.5);
  fireball.animationSpeed = 0.17;
  fireball.play();
}

const bossRadius = 15;
let bossAngle = 0;
let bossAngle1 = 0.5;
let bossAngle2 = Math.PI; // Angle initial pour la deuxième fireball
function moveFireballs() {
  // Mouvement de la troisieme fireball
  let x = bossRadius * Math.cos(bossAngle);
  let y = bossRadius * Math.sin(bossAngle);
  bossFireball.position.set(x + 5, y + 10);
  bossAngle += 0.05;

  // Mouvement de la première fireball
  x = bossRadius * Math.cos(bossAngle1);
  y = bossRadius * Math.sin(bossAngle1);
  bossFireball1.position.set(x, y);
  bossAngle1 += 0.1;

  // Mouvement de la deuxième fireball
  x = bossRadius * Math.cos(bossAngle2);
  y = bossRadius * Math.sin(bossAngle2);
  bossFireball2.position.set(x + 5, y + 10);
  bossAngle2 += 0.05;
}

// // Incorporer les fireballs du joueur et du boss dans le boss
type Boss = AnimatedSprite & { life: number; damage: number };
const boss = new AnimatedSprite(atlasLoader.boss.animations.idle) as Boss;
boss.scale.set(6);
boss.animationSpeed = 0.17;
boss.play();
// boss.x -= 45;
// boss.y -= 450;
camera.addChild(boss);
boss.life = 500;
boss.damage = 10;

// Ajouter les fireballs du boss au boss, mais initialement invisibles
boss.addChild(bossFireball);
boss.addChild(bossFireball1);
boss.addChild(bossFireball2);
bossFireball.visible = true;
bossFireball1.visible = true;
bossFireball2.visible = true;

camera.addChild(boss);
console.table(getCoordinates(bossFireball2));

let invulnerabilityTime = 0;
const invulnerabilityTimer = 1000;
app.ticker.add(() => {
  // Vérifier si le boss est vulnérable avant de déplacer la fireball du joueur
  // if (!invulnerable) {
  for (const fireball of fireballs) {
    const fireballCorrectedPosition = {
      x: fireball.x,
      y: fireball.y,
      width: fireball.width,
      height: fireball.height,
    };

    if (isColliding(playerHitbox, fireballCorrectedPosition)) {
      console.log(fireballCorrectedPosition);
      console.log('damage');
      if (Date.now() - invulnerabilityTime <= invulnerabilityTimer) continue;
      invulnerabilityTime = Date.now();
      playerStats.life -= 1;
      lifeHud.text = `Life: ${playerStats.life}`;
      // if (boss.life <= 0) {
      // camera.removeChild(boss);
      // }
    }
  }

  // }

  // Déplacer les fireballs du boss
  moveFireballs();
});

// export { boss };
