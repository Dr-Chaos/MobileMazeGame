export type Collider = { x: number; y: number; width: number; height: number; priority?: number };

export const priority1 = 3;
export const priority2 = 2;
export const priority3 = 1;

export function isColliding(object1: Collider, object2: Collider): boolean {
  return (
    object1.x < object2.x + object2.width
    && object1.x + object1.width > object2.x
    && object1.y < object2.y + object2.height
    && object1.y + object1.height > object2.y
  );
}

export function collisionResponseDirection(player: Collider, object: Collider) {
  const direction = {
    x: 0,
    y: 0,
  };

  const overlapX = Math.min(player.x + player.width, object.x + object.width) - Math.max(player.x, object.x);
  const overlapY = Math.min(player.y + player.height, object.y + object.height) - Math.max(player.y, object.y);

  if (overlapX > overlapY) {
    direction.y = player.y < object.y ? -overlapY : overlapY;
  } else {
    direction.x = player.x < object.x ? -overlapX : overlapX;
  }

  return direction;
}

export function handleCollisionPriority(object1: Collider, object2: Collider) {
  if (object1.priority > object2.priority) {
    // Gérer la collision de object1 avec priorité supérieure
    // Vous pouvez ajouter votre logique de gestion de collision ici
  } else if (object1.priority < object2.priority) {
    // Gérer la collision de object2 avec priorité supérieure
    // Vous pouvez ajouter votre logique de gestion de collision ici
  }
  // Si les priorités sont égales, vous pouvez choisir de gérer de la même manière ou avec une logique spécifique.
}

// Création d'objets Collider avec des priorités spécifiques
const mapCollider: Collider = {
  x: 0, y: 0, width: 100, height: 100, priority: priority1,
};
const playerCollider: Collider = {
  x: 10, y: 10, width: 20, height: 20, priority: priority2,
};
const skeletonCollider: Collider = {
  x: 30, y: 30, width: 15, height: 15, priority: priority3,
};

// Gérer les collisions en fonction des priorités
handleCollisionPriority(mapCollider, playerCollider);
handleCollisionPriority(playerCollider, skeletonCollider);
// Et ainsi de suite pour d'autres collisions que vous souhaitez gérer.
