import GameScene from "@/games/monster-world/scenes/gameScene";
import Monster from "./monster";

export default class Unicorn extends Monster {
  constructor(
    scene: GameScene,
    x: number,
    y: number,
    relationship: "pet" | "wild"
  ) {
    let moveSpeed = 100;
    let maxHealth = 100;
    let attack = 10;
    let displayH = 50;
    let displayW = 50;
    let imageName = "unicorn";

    super(
      scene,
      x,
      y,
      relationship,
      imageName,
      displayW,
      displayH,
      attack,
      maxHealth,
      moveSpeed
    );
  }
}
