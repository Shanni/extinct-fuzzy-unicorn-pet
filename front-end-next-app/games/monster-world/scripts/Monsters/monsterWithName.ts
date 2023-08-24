import GameScene from "@/games/monster-world/scenes/gameScene";
import Monster from "./monster";

export default class MonsterWithName extends Monster {
  constructor(
    scene: GameScene,
    x: number,
    y: number,
    relationship: "pet" | "wild",
    imageName: string
  ) {
    let moveSpeed = 100;
    let maxHealth = 100;
    let attack = 10;
    let displayH = 50;
    let displayW = 50;

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
