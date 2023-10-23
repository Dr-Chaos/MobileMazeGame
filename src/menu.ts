class MenuScene extends Scene {
  private startButton: Button;

  private optionsButton: Button;

  private quitButton: Button;

  constructor() {
    super('MenuScene');
    // initialiser les boutons et les éléments graphiques ici
  }

  // méthode pour charger des assets, s'ils ne sont pas déjà chargés dans votre jeu
  public preload(): void {
    // charger les images, les sons, etc.
    this.load.image('background', 'chemin/vers/votre/image/de/fond.png');
    // autres assets...
  }

  // méthode pour créer des éléments de scène, appelée après le chargement des assets
  public create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0); // ajuster les coordonnées selon votre besoin

    // créer des boutons et positionner, ajouter des écouteurs d'événements
    this.startButton = this.createButton('Commencer', () => {
      this.startGame();
    });
    this.optionsButton = this.createButton('Options', () => {
      this.openOptions();
    });
    this.quitButton = this.createButton('Quitter', () => {
      this.quitGame();
    });

    // positionner les boutons
    // ...

    // ajouter de la musique de fond, si vous en avez
    // ...
  }

  private createButton(label: string, onClick: Function): Button {
    const button = new Button(this, x, y, label, onClick); // ajuster x, y, peut-être un style
    this.add.existing(button);
    return button;
  }

  // définir les méthodes appelées par les boutons du menu
  private startGame(): void {
    // passer à la scène de jeu ou à tout ce qui devrait se produire lorsque vous commencez un nouveau jeu
    this.scene.start('GameScene');
  }

  private openOptions(): void {
    // passer à la scène d'options ou gérer les options
  }

  private quitGame(): void {
    // code pour quitter le jeu, cela peut dépendre de la plateforme sur laquelle vous travaillez
  }
}
