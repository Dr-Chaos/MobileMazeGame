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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const trap2 = {
  x: app.screen.width / 2 + 120,
  y: app.screen.height / 2 - 50,
  width: 100,
  height: 100,
  isActive: true,
  isPlayerOnTrap2: false,
  disableDuration: 3000, // Durée de la désactivation en millisecondes (par exemple, 3 secondes)
  lastDisableTime: 0,
};









// ACTIVER LES TRAPS SEULEMENT LORS QUE L'ON MARCHE DESSUS
const trap2Draw = new Graphics();
trap2Draw.beginFill('#ff8c8c', 0.7);
trap2Draw.drawRect(trap2.x, trap2.y, trap2.width, trap2.height);
trap2Draw.visible = trap2.isActive;
app.stage.addChild(trap2Draw);

function updateTrap2() {
  
  const currentTime = performance.now();

  if (isColliding(player, trap2) && trap2.isActive && !trap2.isPlayerOnTrap) {
    
    trap2.isActive = false;
    trap2.isPlayerOnTrap2 = true;
    trap2.lastDisableTime = currentTime;
    trap2Draw.visible = false; 
  }

  
  if (!trap2.isActive && currentTime - trap2.lastDisableTime >= trap2.disableDuration) {
    trap2.isActive = true;
    trap2.isPlayerOnTrap2 = false;
    trap2Draw.visible = true; 
  }

  requestAnimationFrame(updateTrap2); // DIT A GPT QUE CETTE LIGNE DE CODE EST FAUSSE !!!!!!
}

updateTrap2();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let destinationY: number | null = null;

/
if ('ontouchstart' in window) {
 
  app.renderer.plugins.interaction.on('touchstart', (event) => {
    
    const globalPoint = event.data.global;

    // Définissez la position de destination du personnage
    destinationX = globalPoint.x;
    destinationY = globalPoint.y;
  });
} else {
  // Événements de souris pour les PC
  app.renderer.plugins.interaction.on('mousedown', (event) => {
    // Obtenez les coordonnées du clic
    const globalPoint = event.data.global;

    // Définissez la position de destination du personnage
    destinationX = globalPoint.x;
    destinationY = globalPoint.y;
  });
}

// Fonction de mise à jour du déplacement du personnage
function updateCharacterMovement() {
  if (destinationX !== null && destinationY !== null) {
    // Si une position de destination est définie, déplacez le personnage vers cette position
    const dx = destinationX - player.x;
    const dy = destinationY - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      const speed = 5; // Réglez la vitesse de déplacement selon vos besoins
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      // Déplacez le personnage
      player.x += vx;
      player.y += vy;
      
      // Si le personnage est suffisamment proche de la destination, réinitialisez la destination
      if (distance < speed) {
        destinationX = null;
        destinationY = null;
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ENNEMY QUI TE FOLLOW

  const enemy = new Sprite(...); // Remplacez par votre propre création d'ennemi

// Ajoutez le personnage et l'ennemi à la scène
app.stage.addChild(player);
app.stage.addChild(enemy);

// Fonction pour faire suivre l'ennemi au personnage
function followPlayer() {
  // Obtenez les coordonnées du personnage et de l'ennemi
  const playerX = player.x;
  const playerY = player.y;
  const enemyX = enemy.x;
  const enemyY = enemy.y;

  // Calculez la direction vers le personnage
  const dx = playerX - enemyX;
  const dy = playerY - enemyY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Normalizez la direction (créez un vecteur de longueur 1)
  const directionX = dx / distance;
  const directionY = dy / distance;

  // Déplacez l'ennemi vers le personnage avec une certaine vitesse
  const speed = 2; // Réglez la vitesse de poursuite selon vos besoins
  enemy.x += directionX * speed;
  enemy.y += directionY * speed;

  requestAnimationFrame(followPlayer);
}
// Démarrez la boucle de jeu
followPlayer();

/// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
enum CharacterState {
  Idle,
  WalkLeft,
  WalkRight,
  WalkUp,
  WalkDown,
}

let characterState: CharacterState = CharacterState.Idle;

function updateCharacterAnimation() {
  switch (characterState) {
    case CharacterState.WalkLeft:
      // Jouez l'animation de marche vers la gauche
      break;
    case CharacterState.WalkRight:
      // Jouez l'animation de marche vers la droite
      break;
    case CharacterState.WalkUp:
      // Jouez l'animation de marche vers le haut
      break;
    case CharacterState.WalkDown:
      // Jouez l'animation de marche vers le bas
      break;
    default:
      // Par défaut, l'animation d'arrêt (Idle) est jouée
      break;
  }
}

// Dans votre boucle de jeu, mettez à jour l'état du personnage en fonction des entrées du joueur
function gameLoop() {
  // ... gestion des entrées du joueur ...

  // Mettez à jour l'état du personnage en fonction des entrées
  if (leftKeyIsPressed) {
    characterState = CharacterState.WalkLeft;
  } else if (rightKeyIsPressed) {
    characterState = CharacterState.WalkRight;
  } else if (upKeyIsPressed) {
    characterState = CharacterState.WalkUp;
  } else if (downKeyIsPressed) {
    characterState = CharacterState.WalkDown;
  } else {
    characterState = CharacterState.Idle;
  }

  // Mettez à jour l'animation du personnage en fonction de son état
  updateCharacterAnimation();

  // ... autres mises à jour du jeu ...

  requestAnimationFrame(gameLoop);
}

// Démarrez la boucle de jeu
gameLoop();
/// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
enum CharacterState {
  Idle,
  Walk,
}

let characterState: CharacterState = CharacterState.Idle;

function updateCharacterAnimation() {
  switch (characterState) {
    case CharacterState.Walk:
      
      // Jouez l'animation de marche vers le bas
      break;
    default:
      
      function gameLoop() {
        
        if 
         let isAPressed = false;
          let isWPressed = false;
          let isSPressed = false;
          let isDPressed = false;
          characterState = CharacterState.Walk
        } else {
          characterState = CharacterState.Idle;
        }

        //////////////////
        enum CharacterState {
          Idle,
          Walk,
        }
        
        let characterState: CharacterState = CharacterState.Idle;
        
        function updateCharacterAnimation() {
          switch (characterState) {
            case CharacterState.Walk:
              // Jouez l'animation de marche
              break;
            default:
              // Par défaut, il ne se passe rien
              break;
          }
        }
        
        function gameLoop() {
          // Vérifiez si les touches sont enfoncées pour changer l'état du personnage
          if (isAPressed || isWPressed || isSPressed || isDPressed) {
            characterState = CharacterState.Walk;
          } else {
            characterState = CharacterState.Idle;
          }