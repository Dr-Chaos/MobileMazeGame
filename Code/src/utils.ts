export function getCoordinates(object: {x: number; y: number; width: number; height: number}) {
  return {
    x: object.x, y: object.y, width: object.width, height: object.height,
  };
}
