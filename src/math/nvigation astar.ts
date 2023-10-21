import { Grid } from 'pathfinding';
import { Finder } from 'pathfinding';
import map from '../../tiled/map-collision.json';
import { skeletons } from '../map-objects/skeleton';


const gridWidth = 60
const gridHeight = 60

// Création d'une grille vide avec des cases accessibles par défaut
const grid = new Grid(gridWidth, gridHeight);

// Parcourir les tuiles de la carte Tiled et marquer les cellules comme obstacles si nécessaire
let mapiteration = 0

for (let x = 0; x < gridWidth; x++) {
  for (let y = 0; y < gridHeight; y++) {
    const tileData = map.layers[0].data
    if (tileData[mapiteration] !== 0) 
    {
      // Marquer la cellule comme obstacle
      grid.setWalkableAt(mapiteration*map.tilewidth, mapiteration*map.tileheight, false);
      
    }
  }
}
// Créez une grille basée sur votre carte Tiled
const mapWidth = map.width;
const mapHeight = map.height;
const tileWidth = map.tilewidtht;
const tileHeight = map.tileheight;
const grid = new Grid(mapWidth, mapHeight);

// Remplissez la grille avec des données de collision depuis votre carte Tiled
// Vous devez parcourir les tuiles de votre carte et marquer les cellules comme obstacle
for (let x = 0; x < mapWidth; x++) {
  for (let y = 0; y < mapHeight; y++) {
    const tileData = /* obtenir les données de la tuile depuis votre carte Tiled */;
    if (tileData.collides) {
      grid.setWalkableAt(x, y, false);
    }
  }
}

// Créez un objet Finder (A*) pour la recherche de chemin
const finder = new Finder(skeletons);

// Fonction pour trouver un chemin entre deux points
function findPath(startX, startY, endX, endY) {
  const path = finder.findPath(startX, startY, endX, endY, grid);
  return path;
}

// Utilisez la fonction findPath pour déterminer le chemin d'un ennemi
const startX = /* position de départ de l'ennemi X */;
const startY = /* position de départ de l'ennemi Y */;
const endX = /* position de fin (objectif) X */;
const endY = /* position de fin (objectif) Y */;

const path = findPath(startX, startY, endX, endY);

// Utilisez le chemin pour déplacer l'ennemi
if (path.length > 0) {
  const nextStep = path[1]; // La première étape est la position actuelle
  const nextX = nextStep[0];
  const nextY = nextStep[1];
  
  // Déplacez l'ennemi vers (nextX, nextY)
}
