import { Container } from 'pixi.js';

export function getCoordinates(object: {x: number; y: number; width: number; height: number}) {
  return {
    x: object.x, y: object.y, width: object.width, height: object.height,
  };
}

// ! VOUS NE POUVEZ PAS METTRE DE SCALING <= 0 (UN SCALIN DE 1 = PAS DE SCALING)
// permets de récupérer les coordonées pour placer un objet au centre de son pivot
// en d'autre mot, le centre de l'objet sera placé au point 0, 0 de l'objet
export function centerFromPivot(x: number, y: number, width: number, height: number, scaling = 1) {
  return {
    x: (x - width / 2) * scaling,
    y: (y - height / 2) * scaling,
    width: height * scaling,
    height: height * scaling,
  };
}

export function centerIfPivotIsUpperLeft(position: {x: number; y: number; width: number; height: number}, scaling = 1) {
  return {
    x: position.x - ((position.width / 2) * scaling) + (position.width / 2),
    y: position.y - ((position.height / 2) * scaling) + (position.height / 2),
    width: position.width * scaling,
    height: position.height * scaling,
  };
}

export function clearContainerChildrenRecursively(parent: Container) {
  const { children } = parent;
  const childrenToRemove = [];

  for (const child of children) {
    if (child instanceof Container && child.children.length > 0) {
      clearContainerChildrenRecursively(child);
    }

    childrenToRemove.push(child);
  }

  for (const childToRemove of childrenToRemove) {
    parent.removeChild(childToRemove);
  }
}
