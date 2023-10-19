export type Collider = { x: number; y: number; width: number; height: number };

export function isColliding(object1: Collider, object2: Collider): boolean {
  return (
    object1.x < object2.x + object2.width
    && object1.x + object1.width > object2.x
    && object1.y < object2.y + object2.height
    && object1.y + object1.height > object2.y
  );
}

export function collisionResponseDirection(object1: Collider, object2: Collider) {
  const direction = {
    x: 0,
    y: 0,
  };

  const overlapX = Math.min(object1.x + object1.width, object2.x + object2.width) - Math.max(object1.x, object2.x);
  const overlapY = Math.min(object1.y + object1.height, object2.y + object2.height) - Math.max(object1.y, object2.y);

  if (overlapX > overlapY) {
    direction.y = object1.y < object2.y ? -overlapY : overlapY;
  } else {
    direction.x = object1.x < object2.x ? -overlapX : overlapX;
  }

  return direction;
}
