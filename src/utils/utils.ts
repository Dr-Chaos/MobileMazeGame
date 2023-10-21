export function getCoordinates(object: {x: number; y: number; width: number; height: number}) {
  return {
    x: object.x, y: object.y, width: object.width, height: object.height,
  };
}

export function applyScalingAndOffset(x: number, y: number, width: number, height: number, scaling: number) {
  return {
    x: (x - width / 2) * scaling,
    y: (y - height / 2) * scaling,
  };
}
