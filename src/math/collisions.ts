export type Collider = { x: number; y: number; width: number; height: number };

export function isColliding(object1: Collider, object2: Collider): boolean {
  return (
    object1.x < object2.x + object2.width
    && object1.x + object1.width > object2.x
    && object1.y < object2.y + object2.height
    && object1.y + object1.height > object2.y
  );
}

// !IMPORTANT, THE PLAYER MUST BE PASSER ON FIRST ARGUMENT
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
