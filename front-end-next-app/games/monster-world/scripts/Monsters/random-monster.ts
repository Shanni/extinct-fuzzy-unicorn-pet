import GameScene from "@/games/monster-world/scenes/gameScene";
import Monster from "./monster";

import AngryCrab from "@/games/monster-world/assets/imgs/test-monster-images/Angry crab.png";
import Ant from "@/games/monster-world/assets/imgs/test-monster-images/Ant.png";
import ArcticHare from "@/games/monster-world/assets/imgs/test-monster-images/Arctic hare.png";
import AuroraBat from "@/games/monster-world/assets/imgs/test-monster-images/Aurora bat.png";
import Bee from "@/games/monster-world/assets/imgs/test-monster-images/Bee.png";
import BlueDog from "@/games/monster-world/assets/imgs/test-monster-images/Blue dog.png";
import ElectricEel from "@/games/monster-world/assets/imgs/test-monster-images/Electric eel.png";

export const ramdomMonsterImage: Map<string, string> = new Map([
  ["AngryCrab", AngryCrab.src],
  ["Ant", Ant.src],
  ["ArcticHare", ArcticHare.src],
  ["AuroraBat", AuroraBat.src],
  ["Bee", Bee.src],
  ["BlueDog", BlueDog.src],
  ["ElectricEel", ElectricEel.src],
]);

export default class RandomMonster extends Monster {
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
    let imageName = getRandomImageKey();

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

function getRandomImageKey(): string {
  let keys = Array.from(ramdomMonsterImage.keys());
  let randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}
