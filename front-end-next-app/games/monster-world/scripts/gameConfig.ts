import GameScene from "@/games/monster-world/scenes/gameScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [GameScene],
  parent: "game-content",
};

export default gameConfig;
