import GameManager from "./gameManager";

class App {
  gameManager;

  constructor() {
    this.gameManager = new GameManager();
  }

  run() {
    this.gameManager.play();
  }
}

const app = new App();

app.run();
