//Création d'une carte de collision :

//Commencez par créer une carte de collision qui correspond à la carte de votre jeu. 
//Vous pouvez utiliser un tableau à deux dimensions pour représenter la carte, 
//où chaque cellule indique s'il y a une collision à cet endroit ou non. Par exemple,
// pourrait signifier pas de collision, et 1 signifier une collision.

    //const collisionMap: number[][] = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];
Détection de collision :

//Lorsque le joueur se déplace ou effectue une action, vous devez vérifier s'il y a une collision à la position où il souhaite se déplacer.
 //Vous pouvez utiliser les coordonnées du joueur (par exemple, playerX et playerY) 
 //pour vérifier la valeur correspondante dans la carte de collision.
 function isCollision(x: number, y: number): boolean {
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    
    // Vérifie si la case de la carte de collision contient une collision
    return collisionMap[tileY][tileX] === 1;
  }
  

  function isCollision(x: number, y: number): boolean {
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    
    // Vérifie si la case de la carte de collision contient une collision
    return collisionMap[tileY][tileX] === 1;
  }
  //Gestion des déplacements :

  //Avant de permettre au joueur de se déplacer, utilisez isCollision pour vérifier 
  //s'il y a une collision à la nouvelle position. 
 // Si une collision est détectée, empêchez le joueur de se déplacer dans cette direction.
  function movePlayer(dx: number, dy: number): void {
    const newX = playerX + dx;
    const newY = playerY + dy;
    
    if (!isCollision(newX, newY)) {
      playerX = newX;
      playerY = newY;
    }
  }
//---lae questions que tu as

const map = [
  1, 0, 1, 0,1 ,1,0 ,0
]
const sizeX: 2;
const sizeY: 2;

//const map = [
    1, 0,
    1, 0,
    1, 1,
    0, 0
  ];
  
  const sizeX = 2; // Largeur de la carte
  const sizeY = 2; // Hauteur de la carte
  
  function isCollision(x: number, y: number): boolean {
    // Assurez-vous que les coordonnées sont à l'intérieur de la carte
    if (x < 0 || x >= sizeX || y < 0 || y >= sizeY) {
      return true; // En dehors de la carte, considéré comme une collision
    }
  
    const index = y * sizeX + x;
    // Vérifie si la case de la carte de collision contient une collision
    return map[index] === 1;
  }
  
  // Exemple d'utilisation
  const playerX = 1;
  const playerY = 1;
  
  if (!isCollision(playerX, playerY)) {
    // Le joueur peut se déplacer vers la nouvelle position
  } else {
    // Collision détectée, empêchez le joueur de se déplacer
  }
  




  //let isCollidingWithBorderBottom = false;

app.ticker.add((delta: number) => {
    // Si il y a une collision
    if (isColliding(borderBottom, witchAnimation)) {
      if (!isCollidingWithBorderBottom) {
        console.log('Collision borderBottom');
        isCollidingWithBorderBottom = true;
      }
    } else {
      isCollidingWithBorderBottom = false;
    }
  
    // collision active
    if (isCollidingWithBorderBottom) {
      witchAnimation.y -= 10 * delta;
    }
  });
  

  
// const borderWidth = 2; // Largeur de la bordure de collision

const collisionTop = new Graphics();
collisionTop.drawRect(0, 0, app.screen.width, borderWidth);

const collisionBottom = new Graphics();
collisionBottom.drawRect(0, app.screen.height - borderWidth, app.screen.width, borderWidth);

const collisionLeft = new Graphics();
collisionLeft.drawRect(0, 0, borderWidth, app.screen.height);

const collisionRight = new Graphics();
collisionRight.drawRect(app.screen.width - borderWidth, 0, borderWidth, app.screen.height);

app.stage.addChild(collisionTop, collisionBottom, collisionLeft, collisionRight);
//function isCollidingWithBorders(object: Sprite | Graphics) {
  return (
    isColliding(collisionTop, object) ||
    isColliding(collisionBottom, object) ||
    isColliding(collisionLeft, object) ||
    isColliding(collisionRight, object)
  );
}
app.ticker.add((delta: number) => {
  // Vérifiez la collision avec les bordures
  if (isCollidingWithBorders(witchAnimation)) {
    // Ajustez la position de l'objet pour le maintenir à l'intérieur de la zone de jeu
    witchAnimation.x = Math.max(borderWidth, Math.min(app.screen.width - witchAnimation.width - borderWidth, witchAnimation.x));
    witchAnimation.y = Math.max(borderWidth, Math.min(app.screen.height - witchAnimation.height - borderWidth, witchAnimation.y));
  }
});
//comment faire que mon personnage recupere un objet automatiquement ?
//Créer l'objet à récupérer 
//Détection de collision : Utilisez la fonction de détection de collision .
//Logique de récupération : Une fois que la collision est détectée,
//mettre en place une logique pour gérer la récupération de l'objet.
  //1. Supprimer l'objet de l'affichage.
 //2. Incrémenter un compteur (inventaire du personnage)
 // Supposons que "character" représente votre personnage et "item" représente l'objet à récupérer.
const character: Sprite = createCharacter();
const item: Sprite = createItem();

app.stage.addChild(character, item);

app.ticker.add((delta: number) => {
  if (isColliding(character, item)) {
    // Collision détectée, récupérez l'objet
    app.stage.removeChild(item); // Retirez l'objet de l'affichage
    character.inventory.push(item); // Ajoutez l'objet à l'inventaire du personnage
    // Vous pouvez également effectuer d'autres actions, comme jouer un son, mettre à jour l'affichage, etc.
    //(inventory ca peut etre une enfait la p)qui dit combien de clef possédés  }
});


