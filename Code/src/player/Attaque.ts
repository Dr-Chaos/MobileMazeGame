import Math
class Character {
  constructor(private readonly x: number, private readonly y: number, private readonly radius: number) {}

  //Boule de feu = Projectile


  launchAttack(angle: number) {
    const projectile = createProjectileAnimation();
    const angle = Math.PI / 4;
    const startX = this.x + this.radius * Math.cos(angle);
    const startY = this.y + this.radius * Math.sin(angle);
    const speed = 5; // Vitesse du projectile (ajustez selon vos besoins)

    let projectileX = startX;
    let projectileY = startY;

    const updateProjectilePosition = () => {
      const deltaX = this.x - projectileX;
      const deltaY = this.y - projectileY;
      const distance = Math.hypot(deltaX, deltaY);
      const directionX = deltaX / distance;
      const directionY = deltaY / distance;
      projectileX += directionX * speed;
      projectileY += directionY * speed;
    };

    const animateProjectile = () => {
      if (checkCollision(projectileX, projectileY)) {
        cancelAnimationFrame(animationFrame);
        destroyProjectileAnimation(projectile);
      } else {
        updateProjectilePosition();
        updateProjectileAnimationPosition(projectileX, projectileY); // Mettre à jour la position de l'animation du projectile
        requestAnimationFrame(animateProjectile);
      }
    };

    const animationFrame = requestAnimationFrame(animateProjectile);
  }
}

// ...

// Exemple d'utilisation :
// const character = new Character(100, 100, 50); // x, y, et radius du personnage
// const angle = Math.PI / 4; // Angle en radians (ajustez selon vos besoins)
// character.launchAttack(angle);
